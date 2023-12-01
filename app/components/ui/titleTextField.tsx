import React from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useTextField } from 'react-aria'

export function TitleTextField(props: AriaTextFieldProps) {
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
				<span
					className={isInvalid ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</label>
			<div className="mt-2">
				<input
					ref={ref}
					{...inputProps}
					className={
						isInvalid
							? 'block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
		</>
	)
}
