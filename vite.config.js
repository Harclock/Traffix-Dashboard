import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Questo dice a Vite: quando vedi "@", vai nella cartella "src"
      '@': path.resolve(__dirname, './src'),
    },
    // Aiuta Vite a trovare i file anche se dimentichi l'estensione
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
})