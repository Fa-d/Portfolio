import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /admin/login requests
      '/admin/login': {
        target: 'http://localhost:3001', // Your backend server
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Set to true if your backend is HTTPS and has a valid cert
      },
      // Proxy /admin/api requests
      '/admin/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/admin\/api/, '/admin/api'), // Ensure path is correctly rewritten if needed, usually fine
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
      },
    },
  }
})
