import { appendFileSync, readFileSync } from 'node:fs'
import { lookup } from 'node:dns/promises'
import { connect as tlsConnect } from 'node:tls'

const baseUrl = 'https://detectapp.nl'
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const firebaseSource = readFileSync(new URL('../src/lib/firebase.ts', import.meta.url), 'utf8')
const sourceConfig = {}
const configProperties = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId']

for (const property of configProperties) {
  const match = firebaseSource.match(new RegExp(`${property}:\\s*import\\.meta\\.env\\.VITE_FIREBASE_[A-Z_]+\\s*\\|\\|\\s*'([^']+)'`))
  if (!match) throw new Error(`Kan de verwachte Firebase-instelling ${property} niet uit de broncode lezen.`)
  sourceConfig[property] = match[1]
}

function result({ ok, repair = false, message }) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `repair=${repair}\n`)
  console.log(message)
  process.exit(ok ? 0 : 1)
}

const host = new URL(baseUrl).hostname
try {
  await lookup(host, { all: true })
} catch (error) {
  result({ ok: false, message: `DNS-resolutie voor ${host} faalt (${error.code || error.message}); geen rebuild gestart.` })
}

let certificateDaysRemaining
try {
  certificateDaysRemaining = await new Promise((resolve, reject) => {
    const socket = tlsConnect({ host, port: 443, servername: host }, () => {
      const certificate = socket.getPeerCertificate()
      const remaining = Math.floor((Date.parse(certificate.valid_to) - Date.now()) / 86_400_000)
      socket.end()
      resolve(remaining)
    })
    socket.once('error', reject)
  })
} catch (error) {
  result({ ok: false, message: `TLS-certificaatcontrole faalt (${error.code || error.message}); geen rebuild gestart.` })
}
if (certificateDaysRemaining <= 30) {
  result({ ok: false, message: `TLS-certificaat verloopt over ${certificateDaysRemaining} dagen; controleer de domeinprovider.` })
}

async function fetchLive(path) {
  try {
    return await fetch(`${baseUrl}${path}`, { headers: { 'cache-control': 'no-cache' }, signal: AbortSignal.timeout(15_000) })
  } catch (error) {
    result({ ok: false, message: `Detect is niet bereikbaar; geen automatische rebuild gestart. ${error.message}` })
  }
}

const indexResponse = await fetchLive(`/?healthcheck=${Date.now()}`)
if ([404, 410].includes(indexResponse.status)) result({ ok: false, repair: true, message: `Detect geeft HTTP ${indexResponse.status}; rebuild nodig.` })
if (!indexResponse.ok) result({ ok: false, message: `Detect gaf HTTP ${indexResponse.status}; geen automatische rebuild gestart.` })

const html = await indexResponse.text()
const entry = html.match(/<script[^>]+src=["']([^"']*assets\/index-[^"']+\.js)["']/)?.[1]
const stylesheet = html.match(/<link[^>]+href=["']([^"']*assets\/index-[^"']+\.css)["']/)?.[1]
const manifest = html.match(/<link[^>]+rel=["']manifest["'][^>]+href=["']([^"']+)["']/)?.[1]
if (!entry || !stylesheet || !manifest) result({ ok: false, repair: true, message: 'Detect-index verwijst niet naar alle benodigde appbestanden; rebuild nodig.' })

async function readAsset(path) {
  const response = await fetchLive(new URL(path, baseUrl).pathname)
  if ([404, 410].includes(response.status)) result({ ok: false, repair: true, message: `Live appbestand ontbreekt (${path}); rebuild nodig.` })
  if (!response.ok) result({ ok: false, message: `Appbestand ${path} gaf HTTP ${response.status}; geen automatische rebuild gestart.` })
  return response
}

const [bundleResponse] = await Promise.all([readAsset(entry), readAsset(stylesheet), readAsset(manifest), readAsset('/sw.js')])
const bundle = await bundleResponse.text()
if (!bundle.includes(packageJson.version)) result({ ok: false, repair: true, message: `Live versie wijkt af van broncode (${packageJson.version}); rebuild nodig.` })

const mismatches = []
for (const property of configProperties) {
  const liveValue = bundle.match(new RegExp(`${property}:"([^"]+)"`))?.[1]
  if (liveValue !== sourceConfig[property]) mismatches.push(property)
}
if (mismatches.length) result({ ok: false, repair: true, message: `Live Firebase-config wijkt af (${mismatches.join(', ')}); rebuild nodig.` })

let authResponse
try {
  authResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=${encodeURIComponent(sourceConfig.apiKey)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ providerId: 'google.com', continueUri: baseUrl }),
    signal: AbortSignal.timeout(15_000)
  })
} catch (error) {
  result({ ok: false, message: `Firebase Google-aanmeldcontrole is niet bereikbaar (${error.cause?.code || error.message}); geen rebuild gestart.` })
}
const authResult = await authResponse.json().catch(() => ({}))
if (!authResponse.ok || authResult.providerId !== 'google.com' || !authResult.authUri) {
  const detail = authResult.error?.message || `HTTP ${authResponse.status}`
  result({ ok: false, message: `Firebase maakt geen Google-aanmeldlink aan (${detail}); controleer provider- en domeininstellingen.` })
}

result({ ok: true, message: `Detect ${packageJson.version}: DNS, TLS-certificaat (${certificateDaysRemaining} dagen), live appbestanden en Firebase Google-aanmeldconfiguratie zijn in orde.` })
