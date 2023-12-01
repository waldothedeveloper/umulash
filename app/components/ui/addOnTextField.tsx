import { useRef } from 'react'
import type { AriaTextFieldProps } from 'react-aria'
import { useTextField } from 'react-aria'

export const AddOnInput = (props: AriaTextFieldProps) => {
	let { label } = props
	const inputRef = useRef<HTMLInputElement>(null)
	let { labelProps, inputProps, isInvalid } = useTextField(props, inputRef)

	return (
		<>
			<label
				className="block text-sm font-medium leading-6 text-slate-900"
				{...labelProps}
			>
				{label}
				{isInvalid ? (
					<span
						className={isInvalid ? 'text-red-500' : 'text-slate-900'}
						aria-hidden="true"
					>
						&nbsp;*
					</span>
				) : (
					<span className="font-normal text-slate-400">(optional)</span>
				)}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					ref={inputRef}
					{...inputProps}
					className={
						isInvalid
							? 'block w-full rounded-md border-0 py-1.5 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
		</>
	)
}
