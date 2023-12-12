import { prisma } from '~/utils/db.server'

export const onboarding = (value: string) => {
	return {
		steps: [
			{
				id: 1,
				status: 'complete',
				name: 'Give your store a name',
				description: 'Think of what makes you unique and distinctive.',
				href: '/onboarding/store-name',
				businessName: value,
			},
			{
				id: 2,
				status: 'current',
				name: 'Create your services',
				description:
					'Either one or multiple package services that could have different pricing tiers.',
				href: '/onboarding/create-services',
			},
			{
				id: 3,
				status: 'upcoming',
				name: 'How will you get paid',
				description: '',
				href: '/onboarding/get-paid',
			},
			{
				id: 4,
				status: 'upcoming',
				name: 'Set up billing',
				description: '',
				href: '/onboarding/setup-billing',
			},
			{
				id: 5,
				status: 'upcoming',
				name: 'Your store security',
				description: '/onboarding/store-security',
				href: '',
			},
		],
	}
}

export const getOnboardingSteps = async (userId: string) => {
	const res = await prisma.shopOnboarding.findUnique({
		select: {
			onboardingSteps: true,
		},
		where: {
			ownerId: userId,
		},
	})

	if (!res) return null
	return res.onboardingSteps
}

export const doesAStoreExistsForThisUser = async (userId: string | null) => {
	// find if this user is an event planner and if the store is already created, or if they are still in the onboarding process
	if (!userId) {
		return null
	}
	const isUserBeingOnboarded = await prisma.shopOnboarding.findUnique({
		select: {
			onboardingComplete: true,
			onboardingSteps: true,
		},
		where: { ownerId: userId },
	})

	if (!isUserBeingOnboarded) {
		// we can redirect to the onboarding process, yay!
		return '/open-store/welcome'
	}

	// if the user has a store and the onboarding is complete, redirect to the seller dashboard
	if (isUserBeingOnboarded.onboardingComplete) {
		return 'seller-dashboard'
	}

	// find out in which step of the onboarding process the user is
	try {
		const onboardingSteps = isUserBeingOnboarded.onboardingSteps

		if (!onboardingSteps) {
			throw new Error(
				'We could not find the onboarding steps for this user. If the error persist, please contact support.',
			)
		}

		const currentStep = onboardingSteps.steps.find(
			step => step.status === 'current',
		)

		switch (currentStep.id) {
			case 1:
				return '/onboarding/store-name'
			case 2:
				return '/onboarding/create-services'
			case 3:
				return '/onboarding/get-paid'
			case 4:
				return '/onboarding/setup-billing'
			case 5:
				return '/onboarding/store-security'
			default:
				return '/'
		}
	} catch (error) {
		throw new Error(
			`There was an error trying to determine your onboarding step. If the error persists, please contact support. ${error}`,
		)
	}
}

export const setupOnboarding = async (userId: string) => {
	return await prisma.shopOnboarding.create({
		data: {
			ownerId: userId,
			onboardingComplete: false,
			onboardingSteps: {
				steps: [
					{
						id: 1,
						status: 'current',
						name: 'Give your store a name',
						description: 'Think of what makes you unique and distinctive.',
						href: '/onboarding/store-name',
						businessName: '',
					},
					{
						id: 2,
						status: 'upcoming',
						name: 'Create your services',
						description:
							'Either one or multiple package services that could have different pricing tiers.',
						href: '/onboarding/create-services',
					},
					{
						id: 3,
						status: 'upcoming',
						name: 'How will you get paid',
						description: '',
						href: '/onboarding/get-paid',
					},
					{
						id: 4,
						status: 'upcoming',
						name: 'Set up billing',
						description: '',
						href: '/onboarding/setup-billing',
					},
					{
						id: 5,
						status: 'upcoming',
						name: 'Your store security',
						description: '/onboarding/store-security',
						href: '/seller-dashboard',
					},
				],
			},
		},
	})
}
