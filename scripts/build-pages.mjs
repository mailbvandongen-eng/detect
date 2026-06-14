import { spawnSync } from 'child_process'
import { copyFileSync, cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync } from 'fs'
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

const docsAssetsDir = resolve('docs/assets')
const viteBin = resolve('node_modules/vite/bin/vite.js')
let backupDir = null

if (existsSync(docsAssetsDir)) {
  backupDir = mkdtempSync(join(tmpdir(), 'detect-assets-'))
  cpSync(docsAssetsDir, backupDir, { recursive: true })
}

const result = spawnSync(process.execPath, [viteBin, 'build', '--mode', 'commercial'], {
  stdio: 'inherit'
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

if (backupDir) {
  copyMissingFiles(backupDir, docsAssetsDir)
  rmSync(backupDir, { recursive: true, force: true })
}
