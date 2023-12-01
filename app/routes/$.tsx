// This is called a "splat route" and as it's in the root `/app/routes/`
// directory, it's a catchall. If no other routes match, this one will and we
// can know that the user is hitting a URL that doesn't exist. By throwing a
// 404 from the loader, we can force the error boundary to render which will
// ensure the user gets the right status code and we can display a nicer error
// message for them than the Remix and/or browser default.

import { Link, useLocation } from '@remix-run/react'

import { GeneralErrorBoundary } from '~/components/error-boundary'
import NavBar from '~/components/navbar'

export async function loader() {
	throw new Response('Not found', { status: 404 })
}

export default function NotFound() {
	// due to the loader, this component will never be rendered, but we'll return
	// the error boundary just in case.
	return <ErrorBoundary />
}

export function ErrorBoundary() {
	const location = useLocation()
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: () => (
					<>
						<NavBar eventPlanner={false} />
						<main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
							<div className="text-center">
								<p className="text-base font-semibold text-cyan-600">404</p>
								<h1 className="mt-4 text-3xl font-bold tracking-tight text-cyan-900 sm:text-5xl">
									Page not found.
								</h1>
								<p className="mt-6 text-base leading-7 text-cyan-600">
									{location.pathname} doesn't exist. Try double-checking the
									URL.
								</p>
								<div className="mt-10 flex items-center justify-center gap-x-6">
									<Link
										to="/"
										className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
									>
										Go back home
									</Link>
								</div>
							</div>
						</main>
					</>
				),
			}}
		/>
	)
}
