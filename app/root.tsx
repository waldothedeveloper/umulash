import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix'
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'

import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { GeneralErrorBoundary } from '~/components/error-boundary'
import styles from './tailwind.css'

export const loader: LoaderFunction = args => {
	return rootAuthLoader(args, ({ request }) => {
		return {
			ENV: {
				GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
			},
		}
	})
}
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

function Document({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>()
	console.log('data: ', data)
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="h-full w-full">
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<script
					async
					src={`https://maps.googleapis.com/maps/api/js?key=${data.ENV.GOOGLE_MAPS_API_KEY}&libraries=places`}
				></script>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export default ClerkApp(App)
export const ErrorBoundary = ClerkErrorBoundary(GeneralErrorBoundary)
