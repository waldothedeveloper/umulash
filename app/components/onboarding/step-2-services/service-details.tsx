import { type Fieldset } from '@conform-to/react'

import AddOns from '~/components/onboarding/step-2-services/add-ons'
import SelectCategory from '~/components/onboarding/step-2-services/categories'
import { Location } from '~/components/onboarding/step-2-services/location'
import { CustomCategoryInput } from '~/components/ui/customCategoryTextField'
import { DescriptionTextAreaField } from '~/components/ui/descriptionTextAreaField'
import { TitleTextField } from '~/components/ui/titleTextField'
import type { JsonifyObject, ServiceDetails } from '~/types/index'

export const ServicesDetails = ({
	conform,
	fields,
	categories,
}: {
	conform: any
	fields: Fieldset<ServiceDetails>
	categories: JsonifyObject
}) => {
	//
	return (
		<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg md:grid-cols-3">
			<header>
				<h2 className="text-base font-semibold leading-7 text-slate-900">
					Service Details
				</h2>
				<p className="mt-1 text-sm leading-6 text-slate-600">
					Tell everyone how great is your service. What makes it unique, and why
					they'll love it.
				</p>
			</header>

			<main className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
				<div className="sm:col-span-full">
					<TitleTextField
						id={fields.title.id}
						label="Title"
						{...conform.input(fields.title)}
						isInvalid={Boolean(fields.title.error)}
						placeholder='e.g. "Bright Love Declaration"'
					/>
					<p
						className="mt-2 text-sm text-red-600"
						id={`${fields.title.id}-error`}
					>
						{fields.title.error}
					</p>
				</div>

				<div className="sm:col-span-full">
					<div className="mt-2">
						<DescriptionTextAreaField
							id={fields.description.id}
							label="Description"
							{...conform.input(fields.description)}
							isInvalid={Boolean(fields.description.error)}
							defaultValue={fields.description.defaultValue}
							placeholder="e.g. &quot;Let your love shine brightly with our Bright Love Declaration package. The centerpiece is a stunning 4ft tall “Marry Me” sign that illuminates your declaration of love. This spectacle of light adds a memorable touch to your proposal, ensuring it's an occasion that stands out. The package also includes a 1-hour professional photography session to capture your unique love story in the radiant glow of your love's proclamation atop a NYC private rooftop.&quot;"
						/>

						<p
							className="mt-2 text-sm text-red-600"
							id={`${fields.description.id}-error`}
						>
							{fields.description.error}
						</p>
						<p
							id={`${fields.description.id}-description`}
							className="mt-3 text-sm leading-6 text-slate-600"
						>
							Name your package uniquely, highlight key features, and evoke
							emotion. Specify logistics, note date restrictions, and consider
							additional add-ons. Your perfect service proposal begins here!
						</p>
					</div>
				</div>

				<div className="sm:col-span-4">
					<div>
						<label
							htmlFor="price"
							className="block text-sm font-medium leading-6 text-slate-900"
						>
							Price
						</label>
						<div className="relative mt-2 rounded-md shadow-sm">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<span
									className={
										fields.price.error
											? 'text-red-500 sm:text-sm'
											: 'text-slate-500 sm:text-sm'
									}
								>
									$
								</span>
							</div>
							<input
								placeholder="99.99"
								{...conform.input(fields.price, {
									type: 'number',
								})}
								className={
									fields.price.error
										? 'block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
										: 'block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
								}
							/>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
								<span
									className={
										fields.price.error
											? 'text-red-500 sm:text-sm'
											: 'text-slate-500 sm:text-sm'
									}
									id="price-currency"
								>
									USD
								</span>
							</div>
						</div>
					</div>

					{/* I'll put this back once I"ll get an idea of how this react-aria input can receive the name property, for now use the above */}
					{/* <PriceInput
						minValue={0}
						maxValue={50000}
						id={fields.price.id}
						label="Price"
						name="price"
						{...conform.input(fields.price)}
						placeholder="$ 100"
						formatOptions={{
							style: 'currency',
							currency: 'USD',
						}}
						isInvalid={Boolean(fields.price.error)}
					/> */}
					<p
						className="mt-2 text-sm text-red-600"
						id={`${fields.price.id}-error`}
					>
						{fields.price.error}
					</p>
					<p
						id={`${fields.price.id}-description`}
						className="mt-3 text-sm leading-6 text-slate-600"
					>
						Price your service competitively to attract more clients. Consider
						including additional add-ons to increase your average order value.
					</p>
				</div>

				<div className="sm:col-span-3">
					<SelectCategory
						categories={categories}
						conform={conform}
						config={fields.category}
					/>

					<p
						id={`${fields.category.id}-description`}
						className="mt-3 text-sm leading-6 text-slate-600"
					>
						If your service doesn't fit into one of the categories above, please
						select 'Other' and create a custom category in the input below.
					</p>
				</div>

				<div className="sm:col-span-full">
					<CustomCategoryInput
						id={fields.custom_category.id}
						type="text"
						label="Custom Category"
						name="custom_category"
						isInvalid={Boolean(fields.custom_category.error)}
						placeholder='e.g. "Marry Me Sign Proposal"'
					/>
					<p
						className="mt-2 text-sm text-red-600"
						id={`${fields.custom_category.id}-error`}
					>
						{fields.custom_category.error}
					</p>
					<p
						id={`${fields.custom_category.id}-description`}
						className="mt-3 text-sm leading-6 text-slate-600"
					>
						Create a custom category only if your service doesn't fit into any
						of the categories above.
					</p>
				</div>

				<div className="col-span-full">
					<Location conform={conform} fields={fields} />
				</div>
				<div className="col-span-full">
					<AddOns conform={conform} fields={fields} />
				</div>
			</main>
		</div>
	)
}
