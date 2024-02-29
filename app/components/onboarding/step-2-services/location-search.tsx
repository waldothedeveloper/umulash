import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'

import { requestIntent } from '@conform-to/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useFetcher } from '@remix-run/react'
import { HiddenLocationInputs } from '~/components/onboarding/step-2-services/hidden-location-inputs'
import { LocationTable } from '~/components/onboarding/step-2-services/locations-table'
import type { GooglePlaceDisplayData } from '~/types/index'

export const LocationSearch = ({
	form,
	location,
}: {
	form: any
	location: {
		defaultValue: string
		descriptionId: string
		error: string
		errorId: string
		errors: string[]
		id: string
		initialError: { message: string }
		name: string
		required: boolean
	}
}) => {
	const [locationsArray, setLocationsArray] = useState<
		GooglePlaceDisplayData[]
	>([])

	const [selected, setSelected] = useState<GooglePlaceDisplayData | null>(null)
	const [query, setQuery] = useState('')
	let fetcher = useFetcher<GooglePlaceDisplayData | { message: string }>()
	const { data, state } = fetcher

	useEffect(function syncServerDataToLocalData() {
		const locationFromLoader = location?.defaultValue
			? JSON.parse(location.defaultValue)
			: []
		if (Array.isArray(locationFromLoader) && locationFromLoader.length > 0) {
			setLocationsArray(locationFromLoader)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(
		function submitLocationValue() {
			requestIntent(form.ref.current, {
				value: 'validate/location',
			})
		},
		[locationsArray, form.ref],
	)

	useEffect(
		function searchLocation() {
			if (query.length > 0) {
				fetcher.load(`/address_search/autocomplete?search=${query}`)
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[query],
	)

	return (
		<div>
			<div className="block text-sm font-medium leading-6 text-slate-900">
				Location
				<span
					className={location.error ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</div>
			<HiddenLocationInputs
				locationsArray={locationsArray}
				serverLocations={
					location?.defaultValue ? JSON.parse(location.defaultValue) : []
				}
			/>
			<div className="mt-2 flex flex-col justify-between md:flex-row">
				<Combobox value={selected} onChange={setSelected}>
					<div className="relative mt-1 w-full">
						<div
							className={
								location.error
									? 'focus-visible:ring-red/75 relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md shadow-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm'
									: 'relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 sm:text-sm'
							}
						>
							<Combobox.Input
								placeholder="e.g. New York, Miami, Central Park, etc."
								className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 ring focus:ring-0"
								displayValue={(place: GooglePlaceDisplayData) =>
									place ? place.description : ''
								}
								onChange={event => setQuery(event.target.value)}
							/>
							<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronUpDownIcon
									className="h-5 w-5 text-slate-400"
									aria-hidden="true"
								/>
							</Combobox.Button>
						</div>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							afterLeave={() => {
								setQuery('')
							}}
						>
							<Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 focus:outline-none sm:text-sm">
								{state === 'loading' && !data ? (
									<Combobox.Option
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-cyan-600 text-white' : 'text-slate-900'
											}`
										}
										value={'loading'}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													Loading...
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-cyan-600'
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								) : null}
								{data && 'message' in data ? (
									<div className="relative cursor-default select-none px-4 py-2 text-slate-700">
										{data?.message ||
											'Nothing found. Check your spelling and try again.'}
									</div>
								) : (
									data &&
									Array.isArray(data) &&
									data.map(place => (
										<Combobox.Option
											key={place.id}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? 'bg-cyan-600 text-white' : 'text-slate-900'
												}`
											}
											value={place}
										>
											{({ selected, active }) => (
												<>
													<span
														className={`block truncate ${
															selected ? 'font-medium' : 'font-normal'
														}`}
													>
														{place.description}
													</span>
													{selected ? (
														<span
															className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																active ? 'text-white' : 'text-cyan-600'
															}`}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Combobox.Option>
									))
								)}
							</Combobox.Options>
						</Transition>
					</div>
				</Combobox>
				<span className="flex-none md:inline-flex">
					<button
						disabled={state === 'loading'}
						onClick={() => {
							const exists = locationsArray.find(
								location => location.id === selected?.id,
							)
							if (exists) {
								return
							}

							if (selected) {
								setLocationsArray(currLocations => [...currLocations, selected])
								setSelected(null)
							}
						}}
						type="button"
						className={
							(!locationsArray.length && !selected) || (!selected && !query)
								? 'mt-6 inline-flex flex-grow-0 items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white opacity-50 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 md:ml-6 md:mt-0'
								: 'mt-3 inline-flex flex-grow-0  items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 md:ml-6 md:mt-0'
						}
					>
						Add
						<PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
					</button>
				</span>
			</div>
			<p className="mt-2 text-sm text-red-600" id={location.errorId}>
				{location.error}
			</p>

			<p className="mt-3 text-sm leading-6 text-slate-600">
				Let your clients this service can take place. Start by typing a city,
				then select the city from the dropdown, and finally click the "Add"
				button. Repeat the same steps for more than one location.
			</p>
			<LocationTable
				locations={locationsArray}
				setLocation={setLocationsArray}
				form={form}
			/>
		</div>
	)
}
