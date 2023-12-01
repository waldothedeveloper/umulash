import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { useId } from 'react'
import { z } from 'zod'
import type { LoaderData, OnboardingSteps } from '~/types/index'
import { checkUserID } from '~/utils/auth.server'
import { prisma } from '~/utils/db.server'
import { onboarding } from '~/utils/shop.server'

export const StoreNameSchema = z.object({
	name: z
		.string({
			required_error: 'A store name is required',
			invalid_type_error: 'The store name must be a string',
		})
		.regex(/^[a-zA-Z0-9]+$/, {
			message: 'Avoid special characters, spaces, or accented letters.',
		})
		.min(4, { message: 'Keep it between 4-20 characters.' })
		.max(20, { message: 'Keep it between 4-20 characters.' })
		.trim(),
})

export async function loader(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const shopOnboarding = await prisma.shopOnboarding.findUnique({
		select: {
			onboardingSteps: true,
		},
		where: {
			ownerId: userId,
		},
	})

	if (!shopOnboarding) {
		return json({})
	}

	const { onboardingSteps } = shopOnboarding

	return json(onboardingSteps)
}

export async function action(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const formData = await args.request.formData()
	const submission = parse(formData, { schema: StoreNameSchema })

	if (!submission.value || submission.intent !== 'submit') {
		return json(submission)
	}

	// first check if there is already a store with this name
	const existingShopName = await prisma.shopOnboarding.findFirst({
		select: {
			ownerId: true,
			onboardingSteps: true,
		},
		where: {
			onboardingSteps: {
				path: '$.steps[0].businessName',
				string_contains: submission.value.name,
			},
		},
	})
	// if it doesn't exist, update the store business name that was created on the previous welcome step (page)
	if (!existingShopName) {
		await prisma.shopOnboarding.update({
			where: {
				ownerId: userId,
			},
			data: {
				onboardingSteps: onboarding(submission.value.name),
			},
		})

		return redirect('/onboarding/create-services')
	} else {
		//! this case most likely applies to every step of the onboarding process. So you might want to extract this logic to a separate function.
		// check the case where the store name is exactly the same for the logged in user.
		const { onboardingSteps } = existingShopName as OnboardingSteps

		if (
			onboardingSteps &&
			onboardingSteps.steps[0].businessName === submission.value.name
		) {
			return redirect('/onboarding/create-services')
		}

		return json({
			errors: [
				'A store with this name already exists. Please create a different name.',
			],
			error: {
				name: [
					'A store with this name already exists. Please create a different name.',
				],
			},
			payload: { name: submission.value.name },
			value: { name: submission.value.name },
			intent: 'submit',
		})
	}
}

export default function ShopName() {
	const id = useId()
	const lastSubmission = useActionData<typeof action>()
	const data = useLoaderData<LoaderData>()
	const [form, fields] = useForm({
		id,
		shouldValidate: 'onInput',
		shouldRevalidate: 'onInput',
		constraint: getFieldsetConstraint(StoreNameSchema),
		lastSubmission,
		onValidate({ formData }) {
			return parse(formData, { schema: StoreNameSchema })
		},
		defaultValue: {
			name: data?.steps[0].businessName || '',
		},
	})

	return (
		<div className="container mx-auto px-6 py-24 sm:px-24 xl:py-32">
			<div className="space-x-4">
				<div>
					<div className="relative mx-auto max-w-3xl ">
						<h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
							Give your store a name
						</h2>
						<p className="mx-auto mt-4 max-w-xl text-center text-lg leading-8 text-slate-400">
							Capture your brand's individuality with an original store - or
							business - name. Reflect what makes you unique and distinctive.
						</p>
						<Form {...form.props} method="POST" className="mx-auto mt-12">
							<div>
								<label
									htmlFor="onboarding-shop-name-input"
									className="ml-px hidden pl-4 text-sm font-medium leading-6 text-cyan-900"
								>
									Store name
								</label>
								<div className="mt-2">
									<input
										{...conform.input(fields.name, { type: 'text' })}
										className={
											fields.name.error
												? 'block w-full rounded-lg border-0 px-4 py-4 text-red-800 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-base sm:leading-6'
												: 'block w-full rounded-lg border-0 px-4 py-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-base sm:leading-6'
										}
										placeholder="Enter a name for your store"
									/>
								</div>
							</div>
							<div className="mt-4">
								<ul id="name-error" className="prose prose-sm">
									{fields.name.errors ? (
										fields.name.errors?.map(error => (
											<li
												key={error}
												className="flex items-center text-red-500"
											>
												<XMarkIcon className="mr-1 h-4 w-4 text-red-500" />
												{error}
											</li>
										))
									) : (
										<span className="prose prose-sm text-slate-400">
											<li>Keep it between 4-20 characters.</li>
											<li>
												Avoid special characters, spaces, or accented letters.
											</li>
										</span>
									)}
								</ul>
							</div>
							<div className="mt-12 flex items-center justify-end gap-x-6">
								<Link
									to="/"
									className="text-sm font-semibold leading-6 text-cyan-900"
								>
									Cancel
								</Link>
								<button
									disabled={Boolean(fields.name.error)}
									type="submit"
									className={
										fields.name.error
											? 'rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white opacity-50 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
											: 'rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
									}
								>
									Save and continue
								</button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
