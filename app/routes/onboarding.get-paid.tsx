import { Form } from '@remix-run/react'
import { FormWrapper } from '~/components/ui/formWrapper'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function GetPaid() {
	const [openBusinessSellerType, setOpenBusinessSellerType] = useState(false)
	const [openSanctionedRegions, setOpenSanctionedRegions] = useState(false)
	return (
		<div className="container mx-auto px-6 py-24 sm:px-24">
			<div className="pb-24">
				<div>
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-4xl font-bold tracking-tight text-slate-900">
							Getting paid
						</h2>
						<p className="mt-6 text-lg leading-8 text-slate-600">
							We use Plaid to process payments. You can connect your Plaid
							account in the settings page. Plaid will handle all the payments
							and you will receive the money in your Plaid account.
						</p>
					</div>
				</div>
			</div>
			<div className="space-x-4">
				<div>
					<Form method="post">
						<div className="space-y-10">
							<FormWrapper
								title="	For tax purposes, what type of seller are you?"
								description="We will use this info to verify your identity and report
										your income to the IRS."
							>
								<div className="sm:col-span-full">
									<fieldset>
										<legend className="sr-only">Seller type</legend>
										<div className="space-y-6">
											<div className="relative flex items-start">
												<div className="flex h-6 items-center">
													<input
														id="Individual"
														aria-describedby={`individual-description`}
														name="type"
														type="radio"
														defaultChecked={
															openBusinessSellerType ? false : true
														}
														onClick={() => setOpenBusinessSellerType(false)}
														className="h-4 w-4 border-slate-300 text-cyan-600 focus:ring-cyan-600"
													/>
												</div>
												<div className="ml-3 text-sm leading-6">
													<label
														htmlFor="individual"
														className="font-medium text-slate-900"
													>
														Individual
													</label>
													<p
														id={`individual-description`}
														className="text-slate-500"
													>
														Freelancer, solopreneur, gig hunter, and most people
														fall into this category
													</p>
												</div>
											</div>
											<div className="relative flex items-start">
												<div className="flex h-6 items-center">
													<input
														id="business"
														aria-describedby={`business-description`}
														name="type"
														type="radio"
														onClick={() => setOpenBusinessSellerType(true)}
														className="h-4 w-4 border-slate-300 text-cyan-600 focus:ring-cyan-600"
													/>
												</div>
												<div className="ml-3 text-sm leading-6">
													<label
														htmlFor="business"
														className="font-medium text-slate-900"
													>
														Business
													</label>
													<p
														id={`business-description`}
														className="text-slate-500"
													>
														LLC, Corporation, or Partnership
													</p>
												</div>
											</div>
										</div>
									</fieldset>
								</div>
							</FormWrapper>
							{/* Business if selected */}
							<Transition
								show={openBusinessSellerType}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<FormWrapper
									title="Tell us more about your business"
									description="In accordance with both local and global regulations aimed at maintaining the safety of our marketplace, there might be occasions where we need to authenticate your information, potentially through a secure third-party service. Additionally, as detailed in our Privacy Policy, we may need to disclose certain aspects of your business contact information to buyers. Find out more about this process."
								>
									<div className="space-y-6">
										<div className="col-span-full">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Street address
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="street-address"
													id="street-address"
													autoComplete="street-address"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="col-span-full">
											<label
												htmlFor="street-address"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Apt / Suite / Other{' '}
												<span className="font-normal text-slate-500">
													(optional)
												</span>
											</label>
											<div className="mt-2">
												<input
													type="text"
													name="street-address"
													id="street-address"
													autoComplete="street-address"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>

										<div className="grid gap-x-6 md:grid-cols-6">
											<div className="col-span-3">
												<label
													htmlFor="postal-code"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													ZIP / Postal code
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="postal-code"
														id="postal-code"
														autoComplete="postal-code"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="col-span-3">
												<label
													htmlFor="city"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													City
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="city"
														id="city"
														autoComplete="address-level2"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>

										<div className="mt-2 sm:col-span-3">
											<label
												htmlFor="last-name"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												State
											</label>
											<select
												id="state"
												name="state"
												autoComplete="state"
												className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
											>
												<option>Select state </option>
												<option>Alabama</option>
												<option>Alaska</option>
												<option>American Samoa</option>
												<option>Arizona</option>
												<option>Arkansas</option>
												<option>California</option>
												<option>Colorado</option>
												<option>Connecticut</option>
												<option>Delaware</option>
												<option>District Of Columbia</option>
												<option>Federated States of Micronesia</option>
												<option>Florida</option>
												<option>Georgia</option>
												<option>Guam</option>
												<option>Hawaii</option>
												<option>Idaho</option>
												<option>Illinois</option>
												<option>Indiana</option>
												<option>Iowa</option>
												<option>Kansas</option>
												<option>Kentucky</option>
												<option>Louisiana</option>
												<option>Maine</option>
												<option>Marshall Islands</option>
												<option>Maryland</option>
												<option>Massachusetts</option>
												<option>Michigan</option>
												<option>Minnesota</option>
												<option>Mississippi</option>
												<option>Missouri</option>
												<option>Montana</option>
												<option>Nebraska</option>
												<option>Nevada</option>
												<option>New Hampshire</option>
												<option>New Jersey</option>
												<option>New Mexico</option>
												<option>New York</option>
												<option>North Carolina</option>
												<option>North Dakota</option>
												<option>Northern Mariana Islands</option>
												<option>Ohio</option>
												<option>Oklahoma</option>
												<option>Oregon</option>
												<option>Palau</option>
												<option>Pennsylvania</option>
												<option>Puerto Rico</option>
												<option>Rhode Island</option>
												<option>South Carolina</option>
												<option>South Dakota</option>
												<option>Tennessee</option>
												<option>Texas</option>
												<option>Utah</option>
												<option>Vermont</option>
												<option>Virgin Islands</option>
												<option>Virginia</option>
												<option>Washington</option>
												<option>West Virginia</option>
												<option>Wisconsin</option>
												<option>Wyoming</option>
												<option>Armed Forces - AA</option>
												<option>Armed Forces - AE</option>
												<option>Armed Forces - AP</option>
											</select>
										</div>
										{/* Phone Number */}
										<div className="mt-2 sm:col-span-3">
											<label
												htmlFor="phone-number"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Phone Number
											</label>
											<div className="relative mt-2 rounded-md shadow-sm">
												<div className="absolute inset-y-0 left-0 flex items-center">
													<label htmlFor="country" className="sr-only">
														Country
													</label>
												</div>
												<input
													type="text"
													name="phone-number"
													id="phone-number"
													className="block w-full rounded-md border-0 py-1.5 pl-2 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
													placeholder="+1 (555) 987-6543"
												/>
											</div>
										</div>

										<div className="mt-2">
											<label
												htmlFor="jurisdiction"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Jurisdiction
											</label>
											<select
												id="jurisdiction"
												name="jurisdiction"
												autoComplete="jurisdiction"
												className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
											>
												<option>Select Jurisdiction</option>
												<option>Alabama</option>
												<option>Alaska</option>
												<option>American Samoa</option>
												<option>Arizona</option>
												<option>Arkansas</option>
												<option>California</option>
												<option>Colorado</option>
												<option>Connecticut</option>
												<option>Delaware</option>
												<option>District Of Columbia</option>
												<option>Florida</option>
												<option>Georgia</option>
												<option>Guam</option>
												<option>Hawaii</option>
												<option>Idaho</option>
												<option>Illinois</option>
												<option>Indiana</option>
												<option>Iowa</option>
												<option>Kansas</option>
												<option>Kentucky</option>
												<option>Louisiana</option>
												<option>Maine</option>
												<option>Maryland</option>
												<option>Massachusetts</option>
												<option>Michigan</option>
												<option>Minnesota</option>
												<option>Mississippi</option>
												<option>Missouri</option>
												<option>Montana</option>
												<option>Nebraska</option>
												<option>Nevada</option>
												<option>New Hampshire</option>
												<option>New Jersey</option>
												<option>New Mexico</option>
												<option>New York</option>
												<option>North Carolina</option>
												<option>North Dakota</option>
												<option>Northern Mariana Islands</option>
												<option>Ohio</option>
												<option>Oklahoma</option>
												<option>Oregon</option>
												<option>Pennsylvania</option>
												<option>Puerto Rico</option>
												<option>Rhode Island</option>
												<option>South Carolina</option>
												<option>South Dakota</option>
												<option>Tennessee</option>
												<option>Texas</option>
												<option>Utah</option>
												<option>Vermont</option>
												<option>Virgin Islands</option>
												<option>Virginia</option>
												<option>Washington</option>
												<option>West Virginia</option>
												<option>Wisconsin</option>
												<option>Wyoming</option>
											</select>
										</div>
										<div className="col-span-full">
											<label
												htmlFor="legal-entity-name"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Name of legal entity
												<span
													className={false ? 'text-red-500' : 'text-slate-900'}
													aria-hidden="true"
												>
													&nbsp;*
												</span>
											</label>

											<div className="mt-2">
												<input
													type="text"
													name="legal-entity-name"
													id="legal-entity-name"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div className="col-span-full">
											<label
												htmlFor="biz-reg-number"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Business Registration Number
												<span
													className={false ? 'text-red-500' : 'text-slate-900'}
													aria-hidden="true"
												>
													&nbsp;*
												</span>
											</label>

											<div className="mt-2">
												<input
													type="text"
													name="biz-reg-number"
													id="biz-reg-number"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
												/>
											</div>
											<p className="mt-1 text-sm font-light text-slate-500">
												This number is issued by your local jurisdiction for
												your registered business and differs from your Federal
												Employer Identification Number (EIN).
											</p>
										</div>

										<div className="col-span-full">
											<label
												htmlFor="business_registration_number_ein"
												className="block text-sm font-medium leading-6 text-slate-900"
											>
												Federal Employer Identification Number (EIN)
												<span
													className={false ? 'text-red-500' : 'text-slate-900'}
													aria-hidden="true"
												>
													&nbsp;*
												</span>
											</label>

											<div className="mt-2">
												<input
													pattern="^[1-9]\d?-\d{7}$"
													type="number"
													name="business_registration_number_ein"
													id="business_registration_number_ein"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
												/>
											</div>
											<p className="mt-1 text-sm font-light text-slate-500">
												This number is issued by the IRS and is used to identify
												your business for tax purposes.
											</p>
										</div>
									</div>
								</FormWrapper>
							</Transition>
							{/* Individual if selected */}
							<Transition
								show={!openBusinessSellerType}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<div className="shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg">
									<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 md:grid-cols-3">
										<header>
											<h2 className="text-base font-semibold leading-7 text-slate-900">
												Share a bit about who you are.
											</h2>
											<p className="mt-1 text-sm leading-6 text-slate-600">
												To ensure compliance, we might use a secure third-party
												service to confirm your identity. Rest assured, this
												information will never be visible to the public on
												Umulash
											</p>
										</header>

										<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
											<div className="sm:col-span-full">
												<label
													htmlFor="first-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													First name
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>

												<div className="mt-2">
													<input
														type="text"
														name="first-name"
														id="first-name"
														autoComplete="given-name"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-full">
												<label
													htmlFor="last-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													Last name
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="last-name"
														id="last-name"
														autoComplete="family-name"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											{/* Date of birth */}
											<div className="sm:col-span-full">
												<label
													htmlFor="last-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													Date of birth
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>

												<div className="flex space-x-5">
													<div className="mt-2">
														<select
															id="dob-container-month"
															name="month"
															autoComplete="month"
															className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option>Month</option>
															<option>January</option>
															<option>February</option>
															<option>March</option>
															<option>April</option>
															<option>May</option>
															<option>June</option>
															<option>July</option>
															<option>August</option>
															<option>September</option>
															<option>October</option>
															<option>November</option>
															<option>December</option>
														</select>
													</div>
													<div className="mt-2">
														<select
															id="dob-container-day"
															name="day"
															autoComplete="day"
															className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option>Day</option>
															{Array.from({ length: 31 }, (_, i) => (
																<option key={i}>{i + 1}</option>
															))}
														</select>
													</div>
													<div className="mt-2">
														<select
															id="dob-container-year"
															name="year"
															autoComplete="year"
															className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
														>
															<option>Year</option>
															{Array.from({ length: 120 }, (_, i) => (
																<option key={i}>
																	{new Date().getFullYear() - i}
																</option>
															))}
														</select>
													</div>
												</div>
											</div>
											{/* Social Sec SSN */}
											<div className="sm:col-span-3">
												<label
													htmlFor="last-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													Social Security Number (SSN)
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>
												<div className="relative mt-2 rounded-md shadow-sm">
													<input
														required
														id="identity-individual-ssn"
														placeholder="XXX-XX-XXXX"
														type="text"
														name="ssn"
														autoComplete="off"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											{/* Phone number */}
											<div className="sm:col-span-3">
												<label
													htmlFor="phone-number"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													Phone Number
												</label>
												<div className="relative mt-2 rounded-md shadow-sm">
													<input
														type="text"
														name="phone-number"
														id="phone-number"
														className="block w-full rounded-md border-0 py-1.5 pl-2 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
														placeholder="+1 (555) 987-6543"
													/>
												</div>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 md:grid-cols-3">
										<header>
											<h2 className="text-base font-semibold leading-7 text-slate-900">
												Your taxpayer address
											</h2>
											<p className="mt-1 text-sm leading-6 text-slate-600">
												Make sure to use the address you use for tax filings; it
												shouldn't be a P.O. Box or a business address.
											</p>
										</header>
										<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
											<div className="col-span-full">
												<div className="space-y-6">
													<div className="col-span-full">
														<label
															htmlFor="street-address"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															Street address
															<span
																className={
																	false ? 'text-red-500' : 'text-slate-900'
																}
																aria-hidden="true"
															>
																&nbsp;*
															</span>
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="street-address"
																id="street-address"
																autoComplete="street-address"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>

													<div className="sm:col-span-2 sm:col-start-1">
														<label
															htmlFor="city"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															City
															<span
																className={
																	false ? 'text-red-500' : 'text-slate-900'
																}
																aria-hidden="true"
															>
																&nbsp;*
															</span>
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="city"
																id="city"
																autoComplete="address-level2"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>

													<div className="sm:col-span-2">
														<label
															htmlFor="region"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															State / Province
															<span
																className={
																	false ? 'text-red-500' : 'text-slate-900'
																}
																aria-hidden="true"
															>
																&nbsp;*
															</span>
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="region"
																id="region"
																autoComplete="address-level1"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>

													<div className="sm:col-span-2">
														<label
															htmlFor="postal-code"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															ZIP / Postal code
															<span
																className={
																	false ? 'text-red-500' : 'text-slate-900'
																}
																aria-hidden="true"
															>
																&nbsp;*
															</span>
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="postal-code"
																id="postal-code"
																autoComplete="postal-code"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Transition>
							{/* Primary and secondary business owners */}
							<Transition
								show={openBusinessSellerType}
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							>
								<div className="shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg">
									<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 md:grid-cols-3">
										<header>
											<h2 className="text-base font-semibold leading-7 text-slate-900">
												Who is the main owner of the business?
											</h2>
											<p className="mt-1 text-sm leading-6 text-slate-600">
												Please provide the exact name as it appears on their
												government-issued ID.
											</p>
										</header>

										<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
											<div className="sm:col-span-3">
												<label
													htmlFor="first-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													First name
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>

												<div className="mt-2">
													<input
														type="text"
														name="first-name"
														id="first-name-2"
														autoComplete="given-name"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>

											<div className="sm:col-span-3">
												<label
													htmlFor="last-name"
													className="block text-sm font-medium leading-6 text-slate-900"
												>
													Last name
													<span
														className={
															false ? 'text-red-500' : 'text-slate-900'
														}
														aria-hidden="true"
													>
														&nbsp;*
													</span>
												</label>
												<div className="mt-2">
													<input
														type="text"
														name="last-name"
														id="last-name"
														autoComplete="family-name"
														className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
											<div className="space-y-6 sm:col-span-full">
												<div className="col-span-full">
													<label
														htmlFor="street-address"
														className="block text-sm font-medium leading-6 text-slate-900"
													>
														Street address
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="street-address"
															id="street-address"
															autoComplete="street-address"
															className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="col-span-full">
													<label
														htmlFor="street-address"
														className="block text-sm font-medium leading-6 text-slate-900"
													>
														Apt / Suite / Other{' '}
														<span className="font-normal text-slate-500">
															(optional)
														</span>
													</label>
													<div className="mt-2">
														<input
															type="text"
															name="street-address"
															id="street-address"
															autoComplete="street-address"
															className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
														/>
													</div>
												</div>

												<div className="grid gap-x-6 md:grid-cols-6">
													<div className="col-span-3">
														<label
															htmlFor="postal-code"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															ZIP / Postal code
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="postal-code"
																id="postal-code"
																autoComplete="postal-code"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>

													<div className="col-span-3">
														<label
															htmlFor="city"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															City
														</label>
														<div className="mt-2">
															<input
																type="text"
																name="city"
																id="city"
																autoComplete="address-level2"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>
												</div>

												<div className="mt-2 sm:col-span-3">
													<label
														htmlFor="last-name"
														className="block text-sm font-medium leading-6 text-slate-900"
													>
														State
													</label>
													<select
														id="state"
														name="state"
														autoComplete="state"
														className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
													>
														<option>Select state </option>
														<option>Alabama</option>
														<option>Alaska</option>
														<option>American Samoa</option>
														<option>Arizona</option>
														<option>Arkansas</option>
														<option>California</option>
														<option>Colorado</option>
														<option>Connecticut</option>
														<option>Delaware</option>
														<option>District Of Columbia</option>
														<option>Federated States of Micronesia</option>
														<option>Florida</option>
														<option>Georgia</option>
														<option>Guam</option>
														<option>Hawaii</option>
														<option>Idaho</option>
														<option>Illinois</option>
														<option>Indiana</option>
														<option>Iowa</option>
														<option>Kansas</option>
														<option>Kentucky</option>
														<option>Louisiana</option>
														<option>Maine</option>
														<option>Marshall Islands</option>
														<option>Maryland</option>
														<option>Massachusetts</option>
														<option>Michigan</option>
														<option>Minnesota</option>
														<option>Mississippi</option>
														<option>Missouri</option>
														<option>Montana</option>
														<option>Nebraska</option>
														<option>Nevada</option>
														<option>New Hampshire</option>
														<option>New Jersey</option>
														<option>New Mexico</option>
														<option>New York</option>
														<option>North Carolina</option>
														<option>North Dakota</option>
														<option>Northern Mariana Islands</option>
														<option>Ohio</option>
														<option>Oklahoma</option>
														<option>Oregon</option>
														<option>Palau</option>
														<option>Pennsylvania</option>
														<option>Puerto Rico</option>
														<option>Rhode Island</option>
														<option>South Carolina</option>
														<option>South Dakota</option>
														<option>Tennessee</option>
														<option>Texas</option>
														<option>Utah</option>
														<option>Vermont</option>
														<option>Virgin Islands</option>
														<option>Virginia</option>
														<option>Washington</option>
														<option>West Virginia</option>
														<option>Wisconsin</option>
														<option>Wyoming</option>
														<option>Armed Forces - AA</option>
														<option>Armed Forces - AE</option>
														<option>Armed Forces - AP</option>
													</select>
												</div>
												{/* Phone Number */}
												<div className="mt-2 sm:col-span-full">
													<label
														htmlFor="phone-number"
														className="block text-sm font-medium leading-6 text-slate-900"
													>
														Phone Number
													</label>
													<div className="relative mt-2 rounded-md shadow-sm">
														<div className="absolute inset-y-0 left-0 flex items-center">
															<label htmlFor="country" className="sr-only">
																Country
															</label>
														</div>
														<input
															type="text"
															name="phone-number"
															id="phone-number"
															className="block w-full rounded-md border-0 py-1.5 pl-2 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
															placeholder="+1 (555) 987-6543"
														/>
													</div>
												</div>
												{/* Date of birth */}
												<div className="sm:col-span-full">
													<label
														htmlFor="last-name"
														className="block text-sm font-medium leading-6 text-slate-900"
													>
														Date of birth
														<span
															className={
																false ? 'text-red-500' : 'text-slate-900'
															}
															aria-hidden="true"
														>
															&nbsp;*
														</span>
													</label>
													{/* Date of birth */}
													<div className="flex space-x-5">
														<div className="mt-2">
															<select
																id="dob-container-month"
																name="month"
																autoComplete="month"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
															>
																<option>Month</option>
																<option>January</option>
																<option>February</option>
																<option>March</option>
																<option>April</option>
																<option>May</option>
																<option>June</option>
																<option>July</option>
																<option>August</option>
																<option>September</option>
																<option>October</option>
																<option>November</option>
																<option>December</option>
															</select>
														</div>
														<div className="mt-2">
															<select
																id="dob-container-day"
																name="day"
																autoComplete="day"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
															>
																<option>Day</option>
																{Array.from({ length: 31 }, (_, i) => (
																	<option key={i}>{i + 1}</option>
																))}
															</select>
														</div>
														<div className="mt-2">
															<select
																id="dob-container-year"
																name="year"
																autoComplete="year"
																className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
															>
																<option>Year</option>
																{Array.from({ length: 120 }, (_, i) => (
																	<option key={i}>
																		{new Date().getFullYear() - i}
																	</option>
																))}
															</select>
														</div>
													</div>
													{/* Last 4 of the SSN */}

													<div className="mt-6 sm:col-span-3">
														<label
															htmlFor="last-name"
															className="block text-sm font-medium leading-6 text-slate-900"
														>
															Last 4 digits of Social Security Number
															<span
																className={
																	false ? 'text-red-500' : 'text-slate-900'
																}
																aria-hidden="true"
															>
																&nbsp;*
															</span>
														</label>
														<div className="relative mt-2 flex w-full items-center">
															<p className="whitespace-nowrap pr-2 text-sm text-slate-400 sm:leading-6">
																XXX-XX-
															</p>

															<input
																required
																id="identity-individual-ssn"
																placeholder="XXXX"
																type="text"
																name="ssn"
																autoComplete="off"
																className="block w-full max-w-xs rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Transition>
							{/* Sanctioned Regions  */}
							<FormWrapper
								title="Tell me a bit more about the places you've called home"
								description="Due to sanctions laws that ensure the security of our marketplace, please inform us if you've resided in any of the following locations for more than 6 months in the past 10 years: Cuba, Iran, North Korea, Syria, Crimea, Donetsk People’s Republic ('DNR'), or Luhansk People’s Republic ('LNR'). Once we can confirm your current residence elsewhere, you'll still be able to sell on Umulash. Take a look at our Sanctions Policy for more details."
							>
								<div>
									<label className="block text-sm font-medium leading-6 text-slate-900">
										Have you lived in any of the following sanctioned regions?
									</label>

									<fieldset className="mt-4">
										<legend className="sr-only">Notification method</legend>
										<div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
											<div className="flex items-center">
												<input
													name="notification-method"
													type="radio"
													onClick={() => setOpenSanctionedRegions(true)}
													className="h-4 w-4 border-slate-300 text-cyan-600 focus:ring-cyan-600"
												/>
												<label
													htmlFor="YES"
													className="ml-3 block text-sm font-medium leading-6 text-slate-900"
												>
													YES
												</label>
											</div>
											<div className="flex items-center">
												<input
													name="notification-method"
													type="radio"
													defaultChecked={openSanctionedRegions ? false : true}
													onClick={() => setOpenSanctionedRegions(false)}
													className="h-4 w-4 border-slate-300 text-cyan-600 focus:ring-cyan-600"
												/>
												<label
													htmlFor="NO"
													className="ml-3 block text-sm font-medium leading-6 text-slate-900"
												>
													NO
												</label>
											</div>
										</div>
									</fieldset>
								</div>
								<Transition
									show={openSanctionedRegions}
									enter="transition duration-100 ease-out"
									enterFrom="transform scale-95 opacity-0"
									enterTo="transform scale-100 opacity-100"
									leave="transition duration-75 ease-out"
									leaveFrom="transform scale-100 opacity-100"
									leaveTo="transform scale-95 opacity-0"
								>
									<div className="px-4 pb-2 pt-6 text-sm text-slate-500">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium leading-6 text-slate-900"
										>
											Which sanctioned region did you live in?
											<span
												className={false ? 'text-red-500' : 'text-slate-900'}
												aria-hidden="true"
											>
												&nbsp;*
											</span>
										</label>
										<select
											id="dob-container-month"
											name="month"
											autoComplete="month"
											className="mt-2 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
										>
											<option>Choose a country</option>
											<option>Cuba</option>
											<option>Iran</option>
											<option>North Korea</option>
											<option>Syria</option>
											<option>Crimea</option>
											<option>Donetsk People’s Republic ("DNR")</option>
											<option>Luhansk People’s Republic ("LNR")</option>
										</select>
									</div>

									{/* When was the last day you lived there?  */}
									<div className="mt-12 sm:col-span-full">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium leading-6 text-slate-900"
										>
											When was the last day you lived there?
											<span
												className={false ? 'text-red-500' : 'text-slate-900'}
												aria-hidden="true"
											>
												&nbsp;*
											</span>
										</label>
										<div className="flex space-x-5">
											<div className="mt-2">
												<select
													id="dob-container-month"
													name="month"
													autoComplete="month"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
												>
													<option>Month</option>
													<option>January</option>
													<option>February</option>
													<option>March</option>
													<option>April</option>
													<option>May</option>
													<option>June</option>
													<option>July</option>
													<option>August</option>
													<option>September</option>
													<option>October</option>
													<option>November</option>
													<option>December</option>
												</select>
											</div>
											<div className="mt-2">
												<select
													id="dob-container-day"
													name="day"
													autoComplete="day"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
												>
													<option>Day</option>
													{Array.from({ length: 31 }, (_, i) => (
														<option key={i}>{i + 1}</option>
													))}
												</select>
											</div>
											<div className="mt-2">
												<select
													id="dob-container-year"
													name="year"
													autoComplete="year"
													className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:max-w-xs sm:text-sm sm:leading-6"
												>
													<option>Year</option>
													{Array.from({ length: 11 }, (_, i) => (
														<option key={i}>
															{new Date().getFullYear() - i}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</Transition>
							</FormWrapper>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}
