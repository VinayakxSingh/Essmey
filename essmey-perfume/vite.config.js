import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      fastRefresh: true,
      include: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts']
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom', '@sanity/client', '@sanity/image-url']
  },
  fs: { strict: false },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'sanity-vendor': ['@sanity/client', '@sanity/image-url']
        }
      }
    }
  }
});
