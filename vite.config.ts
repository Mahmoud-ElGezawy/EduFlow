import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'

const ROUTE_TREE_PATH = path.resolve(process.cwd(), 'src/routeTree.gen.ts')

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  cacheDir: '.vite',
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      generatedRouteTree: './src/routeTree.gen.ts',
      enableRouteGeneration: true,
    }),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [
      { find: '@routeTree.gen', replacement: ROUTE_TREE_PATH },
    ],
  },
  server: {
    port: 3001,
    hmr: true,
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@routeTree.gen'],
  },
})
