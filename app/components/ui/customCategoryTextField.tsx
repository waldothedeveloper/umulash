import React from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useTextField } from 'react-aria'

export function CustomCategoryInput(props: AriaTextFieldProps) {
	let { label } = props
	let ref = React.useRef(null)
	let { labelProps, inputProps, isInvalid } = useTextField(props, ref)

	return (
		<>
			<label
				className="block text-sm font-medium leading-6 text-slate-900"
				{...labelProps}
			>
				{label}
				{isInvalid && (
					<span className="text-red-500" aria-hidden="true">
						&nbsp;*
					</span>
				)}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					ref={ref}
					{...inputProps}
					className={
						isInvalid
							? 'mr-4 block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'mr-4 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
		</>
	)
}
