/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // puedes agregar más variables aquí si las necesitas
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
