import { spawnSync } from 'child_process'
import { copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'

function copyMissingFiles(sourceDir, targetDir) {
  if (!existsSync(sourceDir)) {
    return
  }

  mkdirSync(targetDir, { recursive: true })

  for (const entry of readdirSync(sourceDir)) {
    const sourcePath = join(sourceDir, entry)
    const targetPath = join(targetDir, entry)
    const sourceStat = statSync(sourcePath)

    if (sourceStat.isDirectory()) {
      copyMissingFiles(sourcePath, targetPath)
      continue
    }

    if (!existsSync(targetPath)) {
      copyFileSync(sourcePath, targetPath)
    }
  }
}

function preservePublishedFirebaseConfig() {
  const configKeys = {
    VITE_FIREBASE_API_KEY: 'apiKey',
    VITE_FIREBASE_AUTH_DOMAIN: 'authDomain',
    VITE_FIREBASE_PROJECT_ID: 'projectId',
    VITE_FIREBASE_STORAGE_BUCKET: 'storageBucket',
    VITE_FIREBASE_MESSAGING_SENDER_ID: 'messagingSenderId',
    VITE_FIREBASE_APP_ID: 'appId',
  }

  if (Object.keys(configKeys).every((envName) => process.env[envName])) return

  const indexPath = resolve('docs/index.html')
  if (!existsSync(indexPath)) return

  const indexHtml = readFileSync(indexPath, 'utf8')
  const bundleMatch = indexHtml.match(/src=["']\/detect\/(assets\/index-[^"']+\.js)["']/)
  if (!bundleMatch) return

  const bundlePath = resolve('docs', bundleMatch[1])
  if (!existsSync(bundlePath)) return

  const bundle = readFileSync(bundlePath, 'utf8')
  const found = {}

  for (const [envName, propertyName] of Object.entries(configKeys)) {
    const value = bundle.match(new RegExp(`${propertyName}:"([^"]+)"`))?.[1]
    if (value) found[envName] = value
  }

  const validProject = found.VITE_FIREBASE_PROJECT_ID
    && !found.VITE_FIREBASE_PROJECT_ID.includes('your-')
    && found.VITE_FIREBASE_API_KEY
    && !found.VITE_FIREBASE_API_KEY.includes('REPLACE')

  if (!validProject) return

  for (const envName of Object.keys(configKeys)) {
    if (!process.env[envName] && found[envName]) process.env[envName] = found[envName]
  }

  console.log('Firebase-webconfig behouden uit de bestaande publicatie.')
}

const docsAssetsDir = resolve('docs/assets')
const docsRefactorDir = resolve('docs/refactor')
const viteBin = resolve('node_modules/vite/bin/vite.js')
let backupDir = null
let refactorBackupDir = null

preservePublishedFirebaseConfig()

if (existsSync(docsAssetsDir)) {
  backupDir = mkdtempSync(join(tmpdir(), 'detect-assets-'))
  cpSync(docsAssetsDir, backupDir, { recursive: true })
}

if (existsSync(docsRefactorDir)) {
  refactorBackupDir = mkdtempSync(join(tmpdir(), 'detect-refactor-'))
  cpSync(docsRefactorDir, refactorBackupDir, { recursive: true })
}

const result = spawnSync(process.execPath, [viteBin, 'build'], {
  stdio: 'inherit'
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

if (backupDir) {
  copyMissingFiles(backupDir, docsAssetsDir)
  rmSync(backupDir, { recursive: true, force: true })
}

if (refactorBackupDir) {
  copyMissingFiles(refactorBackupDir, docsRefactorDir)
  rmSync(refactorBackupDir, { recursive: true, force: true })
}
