import {
	Bars3Icon,
	BellIcon,
	CalendarIcon,
	ChartPieIcon,
	Cog6ToothIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	HomeIcon,
	UsersIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { NavLink } from '@remix-run/react'
import { UserButton } from '@clerk/remix'
import { classNames } from '~/utils/misc'

const navigation = [
	{ name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
	{ name: 'Team', href: '#', icon: UsersIcon, current: false },
	{ name: 'Projects', href: '#', icon: FolderIcon, current: false },
	{ name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
	{ name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
	{ name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const teams = [
	{ id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
	{ id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
	{ id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

export default function SellerDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-50 lg:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-cyan-900/80" />
						</Transition.Child>

						<div className="fixed inset-0 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-trancyan-x-full"
								enterTo="trancyan-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="trancyan-x-0"
								leaveTo="-trancyan-x-full"
							>
								<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-300"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-300"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
											<button
												type="button"
												className="-m-2.5 p-2.5"
												onClick={() => setSidebarOpen(false)}
											>
												<span className="sr-only">Close sidebar</span>
												<XMarkIcon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</button>
										</div>
									</Transition.Child>
									{/* Sidebar component, swap this element with another sidebar if you like */}
									<div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
										<NavLink to="/" className="flex h-16 shrink-0 items-center">
											<img
												className="h-20 w-auto"
												src="/umulash_logo_2.svg"
												alt="Umulash logo"
											/>
										</NavLink>
										<nav className="flex flex-1 flex-col">
											<ul className="flex flex-1 flex-col gap-y-7">
												<li>
													<ul className="-mx-2 space-y-1">
														{navigation.map(item => (
															<li key={item.name}>
																<a
																	href={item.href}
																	className={classNames(
																		item.current
																			? 'bg-cyan-50 text-cyan-600'
																			: 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600',
																		'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
																	)}
																>
																	<item.icon
																		className={classNames(
																			item.current
																				? 'text-cyan-600'
																				: 'text-cyan-400 group-hover:text-cyan-600',
																			'h-6 w-6 shrink-0',
																		)}
																		aria-hidden="true"
																	/>
																	{item.name}
																</a>
															</li>
														))}
													</ul>
												</li>
												<li>
													<div className="text-xs font-semibold leading-6 text-cyan-400">
														Your teams
													</div>
													<ul className="-mx-2 mt-2 space-y-1">
														{teams.map(team => (
															<li key={team.name}>
																<a
																	href={team.href}
																	className={classNames(
																		team.current
																			? 'bg-cyan-50 text-cyan-600'
																			: 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600',
																		'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
																	)}
																>
																	<span
																		className={classNames(
																			team.current
																				? 'border-cyan-600 text-cyan-600'
																				: 'border-cyan-200 text-cyan-400 group-hover:border-cyan-600 group-hover:text-cyan-600',
																			'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
																		)}
																	>
																		{team.initial}
																	</span>
																	<span className="truncate">{team.name}</span>
																</a>
															</li>
														))}
													</ul>
												</li>
												<li className="mt-auto">
													<a
														href="#"
														className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600"
													>
														<Cog6ToothIcon
															className="h-6 w-6 shrink-0 text-cyan-400 group-hover:text-cyan-600"
															aria-hidden="true"
														/>
														Settings
													</a>
												</li>
											</ul>
										</nav>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-cyan-200 bg-white px-6 pb-4">
						<NavLink to="/" className="flex h-16 shrink-0 items-center">
							<img
								className="h-20 w-auto"
								src="/umulash_logo_2.svg"
								alt="Umulash logo"
							/>
						</NavLink>
						<nav className="flex flex-1 flex-col">
							<ul className="flex flex-1 flex-col gap-y-7">
								<li>
									<ul className="-mx-2 space-y-1">
										{navigation.map(item => (
											<li key={item.name}>
												<a
													href={item.href}
													className={classNames(
														item.current
															? 'bg-cyan-50 text-cyan-600'
															: 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600',
														'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
													)}
												>
													<item.icon
														className={classNames(
															item.current
																? 'text-cyan-600'
																: 'text-cyan-400 group-hover:text-cyan-600',
															'h-6 w-6 shrink-0',
														)}
														aria-hidden="true"
													/>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>
								<li>
									<div className="text-xs font-semibold leading-6 text-cyan-400">
										Your teams
									</div>
									<ul className="-mx-2 mt-2 space-y-1">
										{teams.map(team => (
											<li key={team.name}>
												<a
													href={team.href}
													className={classNames(
														team.current
															? 'bg-cyan-50 text-cyan-600'
															: 'text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600',
														'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
													)}
												>
													<span
														className={classNames(
															team.current
																? 'border-cyan-600 text-cyan-600'
																: 'border-cyan-200 text-cyan-400 group-hover:border-cyan-600 group-hover:text-cyan-600',
															'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium',
														)}
													>
														{team.initial}
													</span>
													<span className="truncate">{team.name}</span>
												</a>
											</li>
										))}
									</ul>
								</li>
								<li className="mt-auto">
									<a
										href="#"
										className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-600"
									>
										<Cog6ToothIcon
											className="h-6 w-6 shrink-0 text-cyan-400 group-hover:text-cyan-600"
											aria-hidden="true"
										/>
										Settings
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className="lg:pl-72">
					<div className="sticky top-0 z-40 w-full lg:px-8">
						<div className="flex h-16 items-center gap-x-4 border-b border-cyan-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
							<button
								type="button"
								className="-m-2.5 p-2.5 text-cyan-700 lg:hidden"
								onClick={() => setSidebarOpen(true)}
							>
								<span className="sr-only">Open sidebar</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</button>

							{/* Separator */}
							<div
								className="h-6 w-px bg-cyan-200 lg:hidden"
								aria-hidden="true"
							/>

							<div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
								<form className="relative flex flex-1" action="#" method="GET">
									<label htmlFor="search-field" className="sr-only">
										Search
									</label>
									<MagnifyingGlassIcon
										className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-cyan-400"
										aria-hidden="true"
									/>
									<input
										id="search-field"
										className="block h-full w-full border-0 py-0 pl-8 pr-0 text-cyan-900 placeholder:text-cyan-400 focus:ring-0 sm:text-sm"
										placeholder="Search..."
										type="search"
										name="search"
									/>
								</form>
								<div className="flex items-center gap-x-4 lg:gap-x-6">
									<button
										type="button"
										className="-m-2.5 p-2.5 text-cyan-400 hover:text-cyan-500"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>

									{/* Separator */}
									<div
										className="hidden lg:block lg:h-6 lg:w-px lg:bg-cyan-200"
										aria-hidden="true"
									/>

									{/* Profile dropdown */}
									<UserButton />
								</div>
							</div>
						</div>
					</div>

					<main className="py-10">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							{/* Your content */}
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
