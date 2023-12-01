import { json, redirect } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'

import type { DataFunctionArgs } from '@remix-run/node'
import Footer from '~/components/footer'
import Stepper from '~/components/stepper'
import type { OnboardingSteps } from '~/types/index'
import { checkUserID } from '~/utils/auth.server'
import { getOnboardingSteps } from '~/utils/shop.server'

export async function loader(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const onboardingSteps = await getOnboardingSteps(userId)

	if (!onboardingSteps) {
		return { steps: null }
	}

	try {
		const steps: OnboardingSteps = onboardingSteps.steps

		return json({ steps })
	} catch (error) {
		throw new Error("Couldn't parse onboarding steps")
	}
}

export default function Onboarding() {
	const { steps } = useLoaderData<typeof loader>()

	return (
		<>
			<div className="w-full px-8 pt-8">
				<div className="relative grid grid-cols-12">
					<div className="col-span-4 flex flex-shrink-0 items-center md:col-span-1">
						<NavLink to="/">
							<img className="h-16 w-auto" src="/umulash_logo_2.svg" alt="" />
						</NavLink>
					</div>

					<div className="col-span-6 md:col-span-11">
						<Stepper steps={steps} />
					</div>
				</div>
			</div>
			<Outlet />
			<Footer />
		</>
	)
}
