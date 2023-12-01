import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { checkUserID } from '~/utils/auth.server'

export const loader: LoaderFunction = async args => {
	const userId = await checkUserID(args)
	if (!userId) {
		return redirect('/')
	}
	return {}
}

export default function Dashboard() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
