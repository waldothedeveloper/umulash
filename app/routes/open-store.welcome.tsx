import type { DataFunctionArgs, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { checkUserID } from '~/utils/auth.server'
import { prisma } from '~/utils/db.server'
import { setupOnboarding } from '~/utils/shop.server'

export const loader: LoaderFunction = async args => {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const name = await prisma.userAccount.findUnique({
		select: {
			firstName: true,
		},
		where: {
			userId,
		},
	})

	if (!name) {
		throw new Error('Something went wrong. Please try again.')
	}

	return json({ name })
}

export async function action(args: DataFunctionArgs) {
	// redirect at the end to "/onboarding/store-name"
	const userId = await checkUserID(args)
	if (!userId) {
		return redirect('/')
	}

	const setupStoreOnboarding = await setupOnboarding(userId)

	if (!setupStoreOnboarding) {
		throw new Error('Something went wrong. Please try again.')
	}

	return redirect('/onboarding/store-name')
}
export default function OnboardingWelcome() {
	const {
		name: { firstName },
	} = useLoaderData<typeof loader>()

	return (
		<div className="bg-white">
			<main>
				<div className="relative isolate">
					<svg
						className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-cyan-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
								width={200}
								height={200}
								x="50%"
								y={-1}
								patternUnits="userSpaceOnUse"
							>
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-cyan-50">
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect
							width="100%"
							height="100%"
							strokeWidth={0}
							fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
						/>
					</svg>
					<div
						className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
						aria-hidden="true"
					>
						<div
							className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-cyan-700 opacity-30"
							style={{
								clipPath:
									'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
							}}
						/>
					</div>
					<div className="overflow-hidden">
						<div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
							<div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
								<div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
									<h1 className="text-4xl font-bold tracking-tight text-cyan-900 sm:text-6xl">
										Welcome Aboard, {firstName}
									</h1>
									<p className="relative mt-6 text-lg leading-8 text-cyan-700 sm:max-w-md lg:max-w-none">
										Join our vibrant online marketplace, where creative
										visionaries like you sell unforgettable proposal moments to
										millions of happy people. Now, let us help you get started.
									</p>
									<Form
										method="post"
										className="mt-10 flex items-center gap-x-6"
									>
										<button
											type="submit"
											className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
										>
											Open Shop
										</button>
									</Form>
								</div>
								<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
									<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa21e?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-cyan-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-900/10" />
										</div>
									</div>
									<div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-cyan-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-900/10" />
										</div>
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1622604061314-28cfb3ac2544?q=80&w=2580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-cyan-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-900/10" />
										</div>
									</div>
									<div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
										<div className="relative">
											<img
												src="https://plus.unsplash.com/premium_photo-1665454931263-3c6809394fa8?q=80&w=2572&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-cyan-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-900/10" />
										</div>
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-cyan-900/5 object-cover shadow-lg"
											/>
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-cyan-900/10" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}