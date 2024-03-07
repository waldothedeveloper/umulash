import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { vercelPreset } from '@vercel/remix/vite'
import { remixDevTools } from 'remix-development-tools/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()
export default defineConfig({
	server: {
		open: true,
		port: 3000,
	},
	plugins: [
		remixDevTools(),
		remix({
			ignoredRouteFiles: ['**/*.css'],
			presets: [vercelPreset],
		}),
		tsconfigPaths(),
	],
})
