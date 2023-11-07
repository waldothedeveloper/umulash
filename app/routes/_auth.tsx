import { Outlet } from '@remix-run/react'
import NavBar from '~/components/navbar'

export default function Auth() {
	return (
		<>
			<NavBar />
			<div className="-z-10 flex h-screen w-full items-center justify-center overflow-hidden">
				<Outlet />
			</div>
		</>
	)
}
