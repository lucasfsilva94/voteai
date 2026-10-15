/// <reference types="vitest/config" />
import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// The site lives at https://lucasfsilva94.github.io/voteai/ on GitHub Pages.
const BASE = '/voteai/'

// Routes without "#": GitHub Pages only serves files that exist, so each route gets its own copy of index.html.
// A reload or a shared link on /voteai/teste then answers 200 and React Router takes over. 404.html covers any
// other path and sends it to the home page.
export const ROUTES = ['teste', 'urna', 'resultado', 'fontes'] as const

function routePages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'voteai-route-pages',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    async writeBundle() {
      const index = resolve(outDir, 'index.html')
      for (const route of ROUTES) {
        await mkdir(resolve(outDir, route), { recursive: true })
        await copyFile(index, resolve(outDir, route, 'index.html'))
      }
      await copyFile(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  base: BASE,
  plugins: [react(), routePages()],
  build: {
    target: 'baseline-widely-available',
    rolldownOptions: {
      output: {
        // React and the router change less often than the app: a separate chunk keeps them cached between deploys.
        codeSplitting: {
          groups: [{ name: 'vendor-react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ }],
        },
      },
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
})
