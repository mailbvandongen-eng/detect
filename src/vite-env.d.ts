/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BUILD_MODE: 'commercial' | 'personal'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
