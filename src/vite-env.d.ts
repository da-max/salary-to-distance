/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_ESRI_API_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
