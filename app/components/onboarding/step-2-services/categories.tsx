import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useRef, useState } from 'react'

import type { FieldConfig } from '@conform-to/react'
import { useInputEvent } from '@conform-to/react'
import type { Categories } from '~/types/index'
import { classNames } from '~/utils/misc'

export default function SelectCategory({
	categories,
	config,
	conform,
}: {
	categories: Categories
	config: FieldConfig<string>
	conform: any
}) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowInputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState(config.defaultValue ?? '')
	const control = useInputEvent({
		ref: shadowInputRef,
		onReset: () => setValue(config.defaultValue ?? ''),
	})

	return (
		<>
			<input
				ref={shadowInputRef}
				{...conform.input(config, { hidden: true })}
				onChange={event => {
					return setValue(event.currentTarget.value)
				}}
				onFocus={() => buttonRef.current?.focus()}
			/>
			<Listbox value={value} onChange={control.change}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium leading-6 text-slate-900">
							Category
						</Listbox.Label>
						<div className="relative mt-2">
							<Listbox.Button
								ref={buttonRef}
								className={
									config.error
										? 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-red-900 shadow-sm ring-1 ring-inset ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6'
										: 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6'
								}
							>
								<span className="block truncate">
									{categories.categories.find(p => value === `${p.name}`)
										?.name ?? 'Select a category'}
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className={
											config.error
												? 'h-5 w-5 text-red-400'
												: 'h-5 w-5 text-slate-400'
										}
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{[
										{ id: '', name: 'Select a category' },
										...categories.categories,
									].map(category => (
										<Listbox.Option
											key={category.id}
											className={({ active }) =>
												classNames(
													active ? 'bg-cyan-600 text-white' : 'text-slate-900',
													'relative cursor-default select-none py-2 pl-3 pr-9',
												)
											}
											value={category.name}
										>
											{({ selected, active }) => (
												<>
													<span
														className={classNames(
															selected ? 'font-semibold' : 'font-normal',
															'block truncate',
														)}
													>
														{category.name}
													</span>

													{selected ? (
														<span
															className={classNames(
																active ? 'text-white' : 'text-cyan-600',
																'absolute inset-y-0 right-0 flex items-center pr-4',
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
			<p className="mt-2 text-sm text-red-600" id="email-error">
				{config.error}
			</p>
		</>
	)
}
