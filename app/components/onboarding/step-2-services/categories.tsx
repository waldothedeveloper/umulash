import { requestIntent, useInputEvent } from '@conform-to/react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useRef, useState } from 'react'

import type { FieldConfig } from '@conform-to/react'
import type { JsonifyObject } from '~/types/index'
import { classNames } from '~/utils/misc'

export default function SelectCategory({
	categories,
	category,
	conform,
	form,
	custom_category,
}: {
	custom_category: FieldConfig<string>
	categories: JsonifyObject
	category: FieldConfig<string>
	conform: any
	form: any
}) {
	const buttonRef = useRef<HTMLButtonElement>(null)
	const shadowInputRef = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState(category.defaultValue ?? '')
	const control = useInputEvent({
		ref: shadowInputRef,
	})

	return (
		<>
			<input
				hidden
				ref={shadowInputRef}
				{...conform.input(category)}
				onChange={event => {
					setValue(event.currentTarget.value)
					return requestIntent(form.ref.current, {
						value: 'validate/category',
					})
				}}
				onFocus={() => buttonRef.current?.focus()}
			/>
			<Listbox
				value={value}
				onChange={control.change}
				disabled={
					custom_category?.defaultValue &&
					custom_category.defaultValue.length > 0
						? true
						: false
				}
			>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-medium leading-6 text-slate-900">
							Category
						</Listbox.Label>
						<div className="relative mt-2">
							<Listbox.Button
								ref={buttonRef}
								className={
									category.error
										? 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-red-900 shadow-sm ring-1 ring-inset ring-red-300 focus:outline-none focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6'
										: 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6'
								}
							>
								<span className="block truncate">
									{categories.find(p => value === `${p.name}`)?.name ??
										'Select a category'}
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronUpDownIcon
										className={
											category.error
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
									{[{ id: '', name: 'Select a category' }, ...categories].map(
										category => (
											<Listbox.Option
												key={category.id}
												className={({ active }) =>
													classNames(
														active
															? 'bg-cyan-600 text-white'
															: 'text-slate-900',
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
										),
									)}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
			<p className="mt-2 text-sm text-red-600" id="email-error">
				{category.error}
			</p>
		</>
	)
}
