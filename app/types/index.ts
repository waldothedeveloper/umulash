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
