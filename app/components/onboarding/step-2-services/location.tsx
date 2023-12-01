import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

import type { Fieldset } from '@conform-to/react'
import type { SetStateAction } from 'react'
import { useState } from 'react'
import type { ServiceDetails } from '~/types'

export const Location = ({
	conform,
	fields,
}: {
	conform: any
	fields: Fieldset<ServiceDetails>
}) => {
	const [locationsArray, setLocationsArray] = useState<string[]>([])
	const [location, setLocation] = useState<string>('')

	const onChange = (event: { target: { value: SetStateAction<string> } }) => {
		return setLocation(event.target.value)
	}

	return (
		<div className="flex flex-col">
			<label
				htmlFor="location"
				className="block text-sm font-medium leading-6 text-slate-900"
			>
				Location
				<span
					className={fields.title.error ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</label>
			<div className="mt-2 flex justify-between">
				{locationsArray.length > 0 ? (
					locationsArray.map((location, index) => {
						return (
							<input
								key={index}
								value={location}
								readOnly
								{...conform.input(fields.location, {
									hidden: true,
									type: 'text',
								})}
							/>
						)
					})
				) : (
					<input
						{...conform.input(fields.location, {
							hidden: true,
							type: 'text',
						})}
					/>
				)}

				<input
					name="locationArray"
					id="locationArray"
					type="text"
					value={location}
					onChange={onChange}
					placeholder="e.g. Central Park, Waterfront, Rooftop, etc."
					className={
						fields.location.error && locationsArray.length === 0
							? 'mr-4 block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'mr-4 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>

				<button
					onClick={() => {
						if (locationsArray.includes(location)) return
						if (location === '') return
						setLocationsArray(currLocation => [...currLocation, location])
						setLocation('')
					}}
					type="button"
					className="inline-flex items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
				>
					Add
					<PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
				</button>
			</div>
			{fields.location.error && locationsArray.length === 0 && (
				<p className="mt-2 text-sm text-red-600">{fields.location.error}</p>
			)}
			<p
				id={`${fields.location.id}-description`}
				className="mt-3 text-sm leading-6 text-slate-600"
			>
				Let your clients this service can take place. Have in mind that this is
				NOT your business address. Start by typing a city or a state, then
				select the city from the dropdown, and finally click the "Add" button.
				You can add as many locations as you want.
			</p>
			{/* Here the user will see the different locations */}
			<div className="my-4 flex space-x-2">
				{locationsArray.map((location, index) => {
					return (
						<div
							key={index}
							className={`inline-flex items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-1.5 pr-2 text-sm font-semibold text-white shadow-sm`}
						>
							{location}
							<button
								onClick={() =>
									setLocationsArray(currLocation =>
										currLocation.filter((_, i) => i !== index),
									)
								}
								type="button"
								className={`ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-cyan-400 hover:bg-cyan-200 hover:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-cyan-300`}
								data-dismiss-target="#badge-dismiss-default"
								aria-label="Remove"
							>
								<XMarkIcon className="h-4 w-4 text-white" aria-hidden="true" />
								<span className="sr-only">Remove badge</span>
							</button>
						</div>
					)
				})}
			</div>
		</div>
	)
}
