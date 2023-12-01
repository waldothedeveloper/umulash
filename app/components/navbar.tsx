import { SignedIn, SignedOut, UserButton } from '@clerk/remix'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {
	BanknotesIcon,
	Bars3Icon,
	BuildingStorefrontIcon,
	MagnifyingGlassIcon,
	ShoppingBagIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import { NavLink } from '@remix-run/react'
import { classNames } from '~/utils/misc'
import { navigation } from '~/utils/navbar-links'

export default function NavBar({ redirectURL }: { redirectURL: string }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="bg-white">
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-trancyan-x-full"
							enterTo="trancyan-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="trancyan-x-0"
							leaveTo="-trancyan-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
								<div className="flex px-4 pb-2 pt-5">
									<button
										type="button"
										className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-slate-400"
										onClick={() => setOpen(false)}
									>
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Links */}
								<Tab.Group as="div" className="mt-2">
									<div className="border-b border-cyan-200">
										<Tab.List className="-mb-px flex space-x-8 px-4">
											{navigation.categories.map(category => (
												<Tab
													key={category.name}
													className={({ selected }) =>
														classNames(
															selected
																? 'border-cyan-600 text-slate-600'
																: 'border-transparent text-slate-900',
															'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
														)
													}
												>
													{category.name}
												</Tab>
											))}
										</Tab.List>
									</div>
									<Tab.Panels as={Fragment}>
										{navigation.categories.map(category => (
											<Tab.Panel
												key={category.name}
												className="space-y-10 px-4 pb-8 pt-10"
											>
												<div className="grid grid-cols-2 gap-x-4">
													{category.featured.map(item => (
														<div
															key={item.name}
															className="group relative text-sm"
														>
															<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-cyan-100 group-hover:opacity-75">
																<img
																	src={item.imageSrc}
																	alt={item.imageAlt}
																	className="object-cover object-center"
																/>
															</div>
															<a
																href={item.href}
																className="mt-6 block font-medium text-slate-900"
															>
																<span
																	className="absolute inset-0 z-10"
																	aria-hidden="true"
																/>
																{item.name}
															</a>
															<p aria-hidden="true" className="mt-1">
																Shop now
															</p>
														</div>
													))}
												</div>
												{category.sections.map(section => (
													<div key={section.name}>
														<p
															id={`${category.id}-${section.id}-heading-mobile`}
															className="font-medium text-slate-900"
														>
															{section.name}
														</p>
														<ul
															aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
															className="mt-6 flex flex-col space-y-6"
														>
															{section.items.map(item => (
																<li key={item.name} className="flow-root">
																	<a
																		href={item.href}
																		className="-m-2 block p-2 text-slate-500"
																	>
																		{item.name}
																	</a>
																</li>
															))}
														</ul>
													</div>
												))}
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>

								<div className="space-y-6 border-t border-cyan-200 px-4 py-6">
									{navigation.pages.map(page => (
										<div key={page.name} className="flow-root">
											<a
												href={page.href}
												className="-m-2 block p-2 font-medium text-slate-900"
											>
												{page.name}
											</a>
										</div>
									))}
								</div>

								<div className="space-y-6 border-t border-cyan-200 px-4 py-6">
									<div className="flow-root">
										<NavLink
											to="/sign-in"
											prefetch="intent"
											className="-m-2 block p-2 font-medium text-slate-900"
										>
											Sign in
										</NavLink>
									</div>
									<div className="flow-root">
										<NavLink
											to="/sign-up"
											prefetch="intent"
											className="-m-2 block p-2 font-medium text-slate-900"
										>
											Create account
										</NavLink>
									</div>
								</div>

								<div className="border-t border-cyan-200 px-4 py-6">
									<a href="#" className="-m-2 flex items-center p-2">
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20150326181342"
											alt=""
											className="block h-auto w-5 flex-shrink-0"
										/>
										<span className="ml-3 block text-base font-medium text-slate-900">
											USD
										</span>
										<span className="sr-only">, change currency</span>
									</a>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			<header className="relative bg-white">
				<p className="flex h-10 items-center justify-center bg-cyan-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
					Get free delivery on orders over $100
				</p>

				<nav
					aria-label="Top"
					className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
				>
					<div className="border-b border-cyan-200">
						<div className="flex h-16 items-center">
							<button
								type="button"
								className="relative rounded-md bg-white p-2 text-slate-400 lg:hidden"
								onClick={() => setOpen(true)}
							>
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<NavLink className="flex items-center justify-center" to="/">
									<img
										className="h-16 w-auto"
										src="/umulash_logo_2.svg"
										alt=""
									/>
								</NavLink>
							</div>

							{/* Flyout menus */}
							<Popover.Group className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									{navigation.categories.map(category => (
										<Popover key={category.name} className="flex">
											{({ open }) => (
												<>
													<div className="relative flex">
														<Popover.Button
															className={classNames(
																open
																	? 'border-cyan-600 text-slate-600'
																	: 'border-transparent text-slate-700 hover:text-slate-800',
																'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
															)}
														>
															{category.name}
														</Popover.Button>
													</div>

													<Transition
														as={Fragment}
														enter="transition ease-out duration-200"
														enterFrom="opacity-0"
														enterTo="opacity-100"
														leave="transition ease-in duration-150"
														leaveFrom="opacity-100"
														leaveTo="opacity-0"
													>
														<Popover.Panel className="absolute inset-x-0 top-full text-sm text-slate-500">
															{/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
															<div
																className="absolute inset-0 top-1/2 bg-white shadow"
																aria-hidden="true"
															/>

															<div className="relative bg-white">
																<div className="mx-auto max-w-7xl px-8">
																	<div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
																		<div className="col-start-2 grid grid-cols-2 gap-x-8">
																			{category.featured.map(item => (
																				<div
																					key={item.name}
																					className="group relative text-base sm:text-sm"
																				>
																					<div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-cyan-100 group-hover:opacity-75">
																						<img
																							src={item.imageSrc}
																							alt={item.imageAlt}
																							className="object-cover object-center"
																						/>
																					</div>
																					<a
																						href={item.href}
																						className="mt-6 block font-medium text-slate-900"
																					>
																						<span
																							className="absolute inset-0 z-10"
																							aria-hidden="true"
																						/>
																						{item.name}
																					</a>
																					<p
																						aria-hidden="true"
																						className="mt-1"
																					>
																						Shop now
																					</p>
																				</div>
																			))}
																		</div>
																		<div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
																			{category.sections.map(section => (
																				<div key={section.name}>
																					<p
																						id={`${section.name}-heading`}
																						className="font-medium text-slate-900"
																					>
																						{section.name}
																					</p>
																					<ul
																						aria-labelledby={`${section.name}-heading`}
																						className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
																					>
																						{section.items.map(item => (
																							<li
																								key={item.name}
																								className="flex"
																							>
																								<a
																									href={item.href}
																									className="hover:text-slate-800"
																								>
																									{item.name}
																								</a>
																							</li>
																						))}
																					</ul>
																				</div>
																			))}
																		</div>
																	</div>
																</div>
															</div>
														</Popover.Panel>
													</Transition>
												</>
											)}
										</Popover>
									))}

									{navigation.pages.map(page => (
										<a
											key={page.name}
											href={page.href}
											className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-800"
										>
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							<div className="ml-auto flex items-center">
								<SignedIn>
									<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<UserButton afterSignOutUrl="/" />
										<NavLink
											to={redirectURL}
											className="p-2 text-slate-400 hover:text-slate-500"
										>
											{redirectURL?.includes('seller-dashboard') ? (
												<BuildingStorefrontIcon
													className="h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<BanknotesIcon className="h-6 w-6" aria-hidden="true" />
											)}
										</NavLink>
									</div>
								</SignedIn>
								<SignedOut>
									<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
										<NavLink
											to="/sign-in"
											className="text-sm font-medium text-slate-700 hover:text-slate-800"
										>
											Sign in
										</NavLink>
										<span className="h-6 w-px bg-cyan-200" aria-hidden="true" />
										<NavLink
											to="/sign-up"
											className="text-sm font-medium text-slate-700 hover:text-slate-800"
										>
											Create account
										</NavLink>
									</div>
								</SignedOut>

								<div className="hidden lg:ml-8 lg:flex">
									<a
										href="#"
										className="flex items-center text-slate-700 hover:text-slate-800"
									>
										<img
											src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/800px-Flag_of_the_United_States.svg.png?20150326181342"
											alt=""
											className="block h-auto w-5 flex-shrink-0"
										/>
										<span className="ml-3 block text-sm font-medium">USD</span>
										<span className="sr-only">, change currency</span>
									</a>
								</div>

								{/* Search */}
								<div className="flex lg:ml-6">
									<a
										href="#"
										className="p-2 text-slate-400 hover:text-slate-500"
									>
										<span className="sr-only">Search</span>
										<MagnifyingGlassIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</a>
								</div>

								{/* Cart */}
								<div className="ml-4 flow-root lg:ml-6">
									<a href="#" className="group -m-2 flex items-center p-2">
										<ShoppingBagIcon
											className="h-6 w-6 flex-shrink-0 text-slate-400 group-hover:text-slate-500"
											aria-hidden="true"
										/>
										<span className="ml-2 text-sm font-medium text-slate-700 group-hover:text-slate-800">
											0
										</span>
										<span className="sr-only">items in cart, view bag</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	)
}
