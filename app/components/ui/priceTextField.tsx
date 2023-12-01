import { useLocale, useNumberField } from 'react-aria'

import React from 'react'
import { useNumberFieldState } from 'react-stately'

export function PriceInput(props) {
	console.log('props: ', props)
	let { locale } = useLocale()
	let state = useNumberFieldState({ ...props, locale })
	let inputRef = React.useRef(null)
	let { labelProps, groupProps, inputProps, isInvalid } = useNumberField(
		props,
		state,
		inputRef,
	)

	return (
		<>
			<label
				className="block text-sm font-medium leading-6 text-slate-900"
				{...labelProps}
			>
				{props.label}
				<span
					className={isInvalid ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</label>
			<div className="relative mt-2 rounded-md shadow-sm" {...groupProps}>
				<input
					ref={inputRef}
					{...inputProps}
					className={
						isInvalid
							? 'block w-full rounded-md border-0 py-1.5 pr-4 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-500 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'block w-full rounded-md border-0 py-1.5 pr-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
				{props.name && (
					<input
						type="hidden"
						name={props.name}
						value={isNaN(state.numberValue) ? '' : state.numberValue}
					/>
				)}
				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<span
						className={
							isInvalid
								? 'text-red-500 sm:text-sm'
								: 'text-slate-500 sm:text-sm'
						}
					>
						USD
					</span>
				</div>
			</div>
		</>
	)
}
