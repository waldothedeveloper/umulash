import { getAuth } from '@clerk/remix/ssr.server'
import type { DataFunctionArgs } from '@remix-run/node'

/*
This is a reusable function that you can use in your route loaders to check if a user is logged in 'server-side' (SSR).
*/

export const checkUserID = async (args: DataFunctionArgs) => {
	const { userId } = await getAuth(args)
	if (!userId) {
		return null
	}
	return userId
}
