import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from "node:url";

// https://vite.dev/config/
export default defineConfig({
  base: '/scale-center-crop/',
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    })
  ],
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@composites": fileURLToPath(new URL("./src/composites", import.meta.url)),
      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      "@filtering": fileURLToPath(new URL("./src/filtering", import.meta.url)),
      "@theming": fileURLToPath(new URL("./src/theming", import.meta.url)),
      "@util": fileURLToPath(new URL("./src/util", import.meta.url)),
    },
  },
})
