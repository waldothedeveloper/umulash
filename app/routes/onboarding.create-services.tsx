import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Prisma } from '@prisma/client'
import {
	unstable_createMemoryUploadHandler as createMemoryUploadHandler,
	json,
	unstable_parseMultipartFormData as parseMultipartFormData,
	redirect,
	type DataFunctionArgs,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useId } from 'react'
import AddOns from '~/components/onboarding/step-2-services/add-ons'
import SelectCategory from '~/components/onboarding/step-2-services/categories'
import { CustomCategoryInput } from '~/components/onboarding/step-2-services/custom-category-input'
import { DescriptionInput } from '~/components/onboarding/step-2-services/description-input'
import { LocationSearch } from '~/components/onboarding/step-2-services/location-search'
import { ServicesPhotoDetails } from '~/components/onboarding/step-2-services/photo-details'
import { PriceInput } from '~/components/onboarding/step-2-services/price-input'
import { ServicesPhotos } from '~/components/onboarding/step-2-services/services-photos'
import { TitleInput } from '~/components/onboarding/step-2-services/title-input'
import { FormWrapper } from '~/components/ui/formWrapper'
import type { OnboardingSteps } from '~/types/index'
import { checkUserID } from '~/utils/auth.server'
import { convertCentsToDollars } from '~/utils/convertCentsToDollars'
import { convertDollarsToCents } from '~/utils/convertDollarsToCents'
import { prisma } from '~/utils/db.server'
import { ServicesSchema } from '~/utils/services-schema'

const selectOnboardingSteps = Prisma.validator<Prisma.ShopOnboardingSelect>()({
	onboardingSteps: true,
})

export async function loader(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const categories = await prisma.category.findMany({
		orderBy: {
			name: 'asc',
		},
	})

	const onboardingSteps = (await prisma.shopOnboarding.findUnique({
		select: selectOnboardingSteps,
		where: {
			ownerId: userId,
		},
	})) as OnboardingSteps | null

	if (!onboardingSteps) {
		throw new Error('No onboarding steps found')
	}

	const { steps } = onboardingSteps.onboardingSteps
	return json({ categories, steps: steps })
}

const MAX_UPLOAD_SIZE = 1024 * 1024 * 12

// submitting and validating the form
export async function action(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const formData = await parseMultipartFormData(
		args.request,
		createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE }),
	)

	//
	const submission = parse(formData, {
		schema: ServicesSchema,
	})
	// console.log('submission: ', submission)
	const { intent } = submission

	const onboardingSteps = (await prisma.shopOnboarding.findUnique({
		select: selectOnboardingSteps,
		where: {
			ownerId: userId,
		},
	})) as OnboardingSteps | null

	//! make sure you check all your action returns to keep them consistent, if this is true, you should return ERROR
	if (!onboardingSteps) {
		return json({ submission })
	}

	const { steps: updatedSteps } = onboardingSteps.onboardingSteps
	const isValidSteps = Array.isArray(updatedSteps) && updatedSteps.length === 5

	const updateBusinessServices = async (
		step: number,
		key: string,
		property: string,
	) => {
		if (isValidSteps) {
			updatedSteps[step].shop_services = {
				...updatedSteps[step].shop_services,
				[key]: property,
			}
			onboardingSteps.onboardingSteps.steps = updatedSteps

			await prisma.shopOnboarding.update({
				where: {
					ownerId: userId,
				},
				data: {
					onboardingSteps: onboardingSteps.onboardingSteps,
				},
			})
		}
	}

	switch (intent) {
		case 'validate/title':
			await updateBusinessServices(
				1,
				'title',
				submission.payload.title as string,
			)

			break
		case 'validate/description':
			await updateBusinessServices(
				1,
				'description',
				submission.payload.description as string,
			)

			break
		case 'validate/price':
			console.log(`SUBMISSION:`, submission)
			const price = submission.payload.price as string
			if (typeof price === 'string' && price === '') {
				await updateBusinessServices(1, 'price', '')
				break
			} else {
				const priceInCents = convertDollarsToCents(price)
				await updateBusinessServices(1, 'price', priceInCents.toString())
			}

			break
		case 'validate/category':
			if (submission.payload.category === 'Select a category') {
				await updateBusinessServices(1, 'category', '')
			} else {
				await updateBusinessServices(
					1,
					'category',
					submission.payload.category as string,
				)
			}

			break
		case 'validate/custom_category':
			await updateBusinessServices(
				1,
				'custom_category',
				submission.payload.custom_category as string,
			)

			break
		case 'validate/location':
			await updateBusinessServices(
				1,
				'location',
				submission.payload.location as string,
			)
		case 'validate/add_On':
			await updateBusinessServices(
				1,
				'add_On',
				submission.payload.add_On as string,
			)
			break
		default:
			break
	}

	if (!submission.value || submission.intent !== 'submit') {
		return json({ submission } as const)
	}

	return redirect(
		`/onboarding/create-services?value=${JSON.stringify(submission.value)}`,
	)
	// return redirect('/onboarding/get-paid')
}

export default function CreateServices() {
	const id = useId()
	const { categories, steps } = useLoaderData<typeof loader>()
	const currentStep = steps[1]

	const actionData = useActionData<typeof action>()
	const [
		form,
		{ title, description, price, category, custom_category, location, add_On },
	] = useForm({
		id,
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onBlur',
		constraint: getFieldsetConstraint(ServicesSchema),
		lastSubmission: actionData?.submission,
		onSubmit(event, { formData, submission }) {
			return parse(formData, { schema: ServicesSchema })
		},
		defaultValue: {
			title: currentStep?.shop_services?.title ?? '',
			description: currentStep?.shop_services?.description ?? '',
			price: currentStep?.shop_services?.price
				? convertCentsToDollars(currentStep?.shop_services?.price)
				: '',
			category: currentStep?.shop_services?.category ?? '',
			custom_category: currentStep?.shop_services?.custom_category ?? '',
			location: currentStep?.shop_services?.location ?? '',
			add_On: currentStep?.shop_services?.add_On ?? '',
		},
	})

	return (
		<div className="container mx-auto px-6 py-24 sm:px-24">
			<div className="pb-24">
				<div>
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-4xl font-bold tracking-tight text-gray-900">
							Services
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Your store can sell one or multiple services in different
							categories and pricing tiers. Feel free to start with just one for
							now, you can always add more services later.
						</p>
					</div>
				</div>
			</div>
			<div className="space-x-4">
				<div>
					<Form {...form.props} method="post" encType="multipart/form-data">
						<div className="space-y-10">
							<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg md:grid-cols-3">
								<ServicesPhotoDetails />
								<div className="md:col-span-2">
									<div className="sm:p-8 md:px-4 md:py-6">
										<ServicesPhotos />
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg md:grid-cols-3">
								<header>
									<h2 className="text-base font-semibold leading-7 text-slate-900">
										Service Details
									</h2>
									<p className="mt-1 text-sm leading-6 text-slate-600">
										Tell everyone how great is your service. What makes it
										unique, and why they'll love it.
									</p>
								</header>

								<main className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
									<div className="sm:col-span-full">
										<TitleInput title={title} conform={conform} />
									</div>

									<div className="sm:col-span-full">
										<DescriptionInput
											description={description}
											conform={conform}
										/>
									</div>

									<div className="sm:col-span-4">
										<PriceInput price={price} conform={conform} />
									</div>

									<div className="sm:col-span-3">
										<SelectCategory
											categories={categories}
											form={form}
											conform={conform}
											category={category}
											custom_category={custom_category}
										/>

										<p
											id={`${category.descriptionId}`}
											className="mt-3 text-sm leading-6 text-slate-600"
										>
											If your service doesn't fit into one of the categories
											above, please select 'Other' and create a custom category
											in the input below.
										</p>
									</div>

									<div className="sm:col-span-full">
										<CustomCategoryInput
											custom_category={custom_category}
											conform={conform}
											category={category}
										/>
									</div>
								</main>
							</div>
							{/* Location Section */}
							<FormWrapper
								title="Location"
								description="Where do you offer this service? You can add multiple
										locations. Search by city, state, or zip code."
							>
								<LocationSearch location={location} form={form} />
							</FormWrapper>
							{/* Add On Section */}
							<FormWrapper
								title="Add On Services"
								description="You can add additional add-ons to one of your main services
										or package. For example, if you're a proposal planner, you
										could offer a musician, a photographer, a speech template,
										even champagne as an add-on for a fixed priced."
							>
								<AddOns add_On={add_On} form={form} />
							</FormWrapper>
						</div>
						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								type="button"
								className="text-sm font-semibold leading-6 text-slate-900"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
							>
								Save
							</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
