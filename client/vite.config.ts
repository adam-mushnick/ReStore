import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //changed localhost port to 3000
  server:{
    port: 3000,
  },
  plugins: [react()],
})
