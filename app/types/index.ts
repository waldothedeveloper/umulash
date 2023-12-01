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
