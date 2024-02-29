import React from 'react'

export const FormWrapper = ({
	title,
	description,
	children,
}: {
	title: string
	description: string
	children: React.ReactNode
}) => {
	return (
		<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg md:grid-cols-3">
			<header>
				<h2 className="text-base font-semibold leading-7 text-slate-900">
					{title}
				</h2>
				<p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
			</header>
			<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
				<div className="col-span-full">{children}</div>
			</div>
		</div>
	)
}
