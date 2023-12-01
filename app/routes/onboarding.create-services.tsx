import { conform, useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useId } from 'react'
import { z } from 'zod'
import ServicesForm from '~/components/onboarding/services-form'
import { checkUserID } from '~/utils/auth.server'
import { prisma } from '~/utils/db.server'

type addOnType = {
	addOn: string
	addOnPrice: string
	id: string
}

const ServicesSchema = z
	.object({
		title: z
			.string({
				required_error: 'A service title is required',
				invalid_type_error: 'The service title must be a string',
			})
			.min(2, {
				message:
					'The service title must be at least 2 characters or a single word.',
			})
			.max(50, {
				message: 'The service title cannot be more than 50 characters.',
			})
			.trim(),
		description: z
			.string({
				required_error: 'A service description is required',
				invalid_type_error: 'The service description must be a string',
			})
			.min(1, {
				message: 'The service description must be at least 50 characters.',
			})
			.max(250, {
				message: 'The service title cannot be more than 50 characters.',
			})
			.trim(),
		price: z
			.number({
				required_error: 'A service price is required',
				invalid_type_error: 'The service price must be a number',
			})
			.refine(x => x * 100 - Math.trunc(x * 100) < Number.EPSILON),
		category: z.string().optional(),
		custom_category: z.string().optional(),
		location: z.array(z.string()).nonempty(),
		addOn: z.string().optional(),
	})
	.transform((data, ctx) => {
		try {
			const { addOn, category, custom_category } = data

			if (!category && !custom_category) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						'Please select a pre-defined category above or create a custom category on this field.',
					path: ['custom_category'],
				})
				return null
			} else if (typeof addOn === 'string' && addOn.length > 0) {
				const addOns = JSON.parse(addOn) as addOnType[]
				const totalAddOnPrice = addOns.reduce((acc, curr) => {
					return acc + parseFloat(curr.addOnPrice)
				}, 0)

				// limit the total addOnPrice to 50,000
				if (totalAddOnPrice > 50000) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'Add-on prices cannot be more than $50,000 usd dollars. Please delete any add-ons that exceed this limit to continue.',
						path: ['addOn'],
					})
					return null
				} else if (totalAddOnPrice < 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message:
							'The total add-on price must be at least $1 usd dollar. Please add an add-on to continue.',
						path: ['addOn'],
					})
					return null
				} else {
					return data
				}
			} else {
				return data
			}
		} catch (error) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'There was an error processing your request.',
			})
			return null
		}
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

	return json({ categories })
}

// submitting and validating the form
export async function action(args: DataFunctionArgs) {
	const userId = await checkUserID(args)

	if (!userId) {
		return redirect('/')
	}

	const formData = await args.request.formData()
	const submission = parse(formData, {
		schema: ServicesSchema,
	})
	console.log('submission WFT WFT WTF WTF : ', submission.payload)

	if (!submission.value || submission.intent !== 'submit') {
		return json({ submission } as const)
	}
	/*
		 save to database
	 then redirect to next page

	ref: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
	
		Please, to anyone reading this in the future, do not use float to store currency. You will loose precision and data. You should store it as a integer number of cents (or pennies etc.) and then convert prior to output. – 
				Philip Whitehouse
 				Mar 4, 2012 at 13:35
	*/
	// return json(submission)
	return redirect('/onboarding/get-paid')
}

export default function CreateServices() {
	const data = useLoaderData<typeof loader>()
	const id = useId()
	const actionData = useActionData<typeof action>()
	const [form, fields] = useForm({
		id,
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onBlur',
		constraint: getFieldsetConstraint(ServicesSchema),
		lastSubmission: actionData?.submission,
		onValidate({ formData }) {
			const res = parse(formData, { schema: ServicesSchema })
			console.log(`submission payload: `, res)
			return res
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
					<Form {...form.props} method="post">
						<ServicesForm conform={conform} fields={fields} categories={data} />
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
