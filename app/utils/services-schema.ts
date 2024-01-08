import type { CloudinaryAssets, addOnType } from '~/types/index'

import { z } from 'zod'

const CloudinaryAssetSchema = z.object({
	secure_url: z.string().url().includes('res.cloudinary.com'),
	asset_id: z.string(),
	public_id: z.string(),
	tags: z.array(z.string()),
})

export const ServicesSchema = z
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
			.min(2, {
				message: 'The service description must be at least 50 characters.',
			})
			.max(250, {
				message: 'The service title cannot be more than 50 characters.',
			})
			.trim(),
		price: z
			.number({
				required_error:
					'What you have entered does not look like a price number. Please enter a valid price.',
				invalid_type_error: 'The service price must be a number',
			})
			.refine(x => Math.abs(Math.round(x * 100) - x * 100) < 0.01, {
				message: 'The service price must have at most two decimal places',
			}),
		location: z.string({
			required_error: 'A service location is required',
			invalid_type_error: 'The service location must be a string',
		}),
	})
	.transform(({ location }, ctx) => {
		try {
			const locationArray = JSON.parse(location)
			if (!locationArray.length) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Please add at least one location for your service',
					path: ['location'],
				})
				return null
			} else {
				return { location }
			}
		} catch (error) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'There was an error processing your request.',
			})
			return null
		}
	})
	.and(
		z
			.object({
				category: z.string().optional(),
				custom_category: z.string().optional(),
			})
			.transform(({ category, custom_category }, ctx) => {
				try {
					if (
						(!category && !custom_category) ||
						(category === 'Select a category' && !custom_category)
					) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								'Please select a pre-defined category above or create a custom category on this field.',
							path: ['custom_category'],
						})
						return null
					}
					return { category, custom_category }
				} catch (error) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'There was an error processing your request.',
					})
					return null
				}
			}),
	)
	.and(
		z.object({ add_On: z.string().optional() }).transform(({ add_On }, ctx) => {
			try {
				if (typeof add_On === 'string' && add_On.length > 0) {
					const addOns = JSON.parse(add_On) as addOnType[]
					const totalAddOnPrice = addOns.reduce((acc, curr) => {
						return acc + parseFloat(curr.addOnPrice)
					}, 0)

					// limit the total addOnPrice to 50,000
					if (totalAddOnPrice > 50000) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								'Add-on prices cannot be more than $50,000 usd dollars. Please delete any add-ons that exceed this limit to continue.',
							path: ['add_On'],
						})
						return null
					} else if (totalAddOnPrice < 0) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message:
								'The total add-on price must be at least $1 usd dollar. Please add an add-on to continue.',
							path: ['add_On'],
						})
						return null
					} else {
						return { add_On }
					}
				}
			} catch (error) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'There was an error processing your request.',
				})
				return null
			}
		}),
	)
	.and(
		z
			.object({
				file_upload: z.string(),
			})
			.transform(({ file_upload }, ctx) => {
				try {
					if (typeof file_upload === 'string' && file_upload.length > 0) {
						const filesUploadedToCloudinary = JSON.parse(file_upload) as
							| CloudinaryAssets[]
							| undefined

						if (
							!filesUploadedToCloudinary ||
							filesUploadedToCloudinary.length === 0
						) {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								message:
									'There was an error saving your uploaded images in our system. Please try again or contact support if this issue persists.',
								path: ['file_upload'],
							})
							return null
						}

						// Validate each item in the array
						filesUploadedToCloudinary.forEach((item, index) => {
							const result = CloudinaryAssetSchema.safeParse(item)

							if (!result.success) {
								ctx.addIssue({
									code: z.ZodIssueCode.custom,
									message: `Invalid item at index ${index}: ${result.error.message}`,
									path: ['file_upload'],
								})
							}
						})

						return { file_upload }
					}

					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'There was an error processing your request.',
					})
				} catch (error) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'There was an error processing your request.',
					})
					return null
				}
			}),
	)
