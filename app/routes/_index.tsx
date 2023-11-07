import type { LoaderFunction, MetaFunction } from '@remix-run/node'

import { createClerkClient } from '@clerk/remix/api.server'
import { getAuth } from '@clerk/remix/ssr.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Footer from '~/components/footer'
import NavBar from '~/components/navbar'
import Products from '~/components/products'
import { prisma } from '~/utils/db.server'

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' },
	]
}

export const loader: LoaderFunction = async args => {
	const { userId } = await getAuth(args)
	if (!userId) {
		return {}
	}
	const user = await createClerkClient({
		secretKey: process.env.CLERK_SECRET_KEY,
	}).users.getUser(userId)

	const dbUser = await prisma.userAccount.findUnique({
		where: { userId: userId },
	})

	if (!dbUser) {
		// Create a new user in the database to link to Clerk user
		const newDbUser = await prisma.userAccount.create({
			data: {
				userId: userId,
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.emailAddresses[0].emailAddress || '',
			},
		})

		return json({ user: newDbUser })
	}

	return json({ user: dbUser })
}

export default function Index() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<>
			<NavBar />
			<main>
				<Products />
			</main>
			<Footer />
		</>
	)
}
