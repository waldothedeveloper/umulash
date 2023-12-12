export type OnboardingSteps = {
	ownerId: string
	onboardingSteps: {
		steps: {
			businessName: string
			description: string
			id: string
			name: string
			status: string
			href: string
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
	categories: { id: string; name: string; createdAt: Date; updatedAt: Date }[]
}

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
