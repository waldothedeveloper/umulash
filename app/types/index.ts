export type OnboardingSteps = {
	ownerId?: string
	onboardingSteps: {
		steps: {
			id: string
			href: string
			name: string
			status: string
			description: string
			businessName: string
			shop_services?: {
				title?: string
				description?: string
				price?: number
				location?: string[]
				category?: string
				custom_category?: string
				add_On?: {
					add_On: string
					addOnPrice: string
					id: string
				}[]
			}
		}[]
	}
}

type ConformTypes = {
	required: false
	name: string
	initialError: {}
	form: string
	id: string
	errorId: string
	descriptionId: string
}

export type ServiceDetails = {
	title: ConformTypes
	description: ConformTypes
	price: ConformTypes
	category: ConformTypes
	custom_category: ConformTypes
	location: ConformTypes
	addOn: ConformTypes
}

export type JsonifyObject = {
	id: string
	name: string
	createdAt: string
	updatedAt: string
}[]

export type LoaderData = {
	steps: {
		businessName: string
		// Include other properties as needed
	}[]
}

export type GooglePlaceDisplayData = {
	id: string
	description: string
}

interface MatchedSubstring {
	length: number
	offset: number
}

interface StructuredFormatting {
	main_text: string
	main_text_matched_substrings: MatchedSubstring[]
	secondary_text: string
}

interface Term {
	offset: number
	value: string
}

interface Prediction {
	description: string
	matched_substrings: MatchedSubstring[]
	place_id: string
	reference: string
	structured_formatting: StructuredFormatting
	terms: Term[]
	types: string[]
}

export interface GoogleMapsPlaceAutoComplete {
	predictions: Prediction[]
	status: string
}

export type CloudinaryUploadApiResponse = {
	asset_id: string
	public_id: string
	version: number
	version_id: string
	signature: string
	width: number
	height: number
	format: string
	resource_type: string
	created_at: string
	tags: string[]
	bytes: number
	type: string
	etag: string
	placeholder: boolean
	url: string
	secure_url: string
	folder: string
	original_filename: string
	api_key: string
}

declare global {
	interface Window {
		ENV: {
			CLOUDINARY_CLOUD_NAME: string
		}
	}
}

export type addOnType = {
	add_On: string
	addOnPrice: string
	id: string
}
