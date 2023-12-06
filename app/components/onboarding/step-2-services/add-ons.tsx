import { type Fieldset } from '@conform-to/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { AddOnTable } from '~/components/onboarding/step-2-services/add-on-table'
import { AddOnPriceInput } from '~/components/ui/addOnPriceTextField'
import { AddOnInput } from '~/components/ui/addOnTextField'
import type { ServiceDetails } from '~/types/index'

export default function AddOns({
	conform,
	fields,
}: {
	conform: any
	fields: Fieldset<ServiceDetails>
}) {
	const [addOn, setAddOn] = useState('')
	const [addOnPrice, setAddOnPrice] = useState('')
	const [errorAddOn, setErrorAddOn] = useState('')
	const [errorAddOnPrice, setErrorAddOnPrice] = useState('')
	const [addedAddOns, setAddedAddOns] = useState<
		{ addOn: string; addOnPrice: string; id: string }[]
	>([])

	const handleAddon = () => {
		const alreadyExists = addedAddOns.some(
			addedAddOn =>
				addedAddOn.addOn === addOn && addedAddOn.addOnPrice === addOnPrice,
		)
		if (alreadyExists) {
			return
		}

		if (!addOn && !addOnPrice) {
			setErrorAddOn('Please add an add-on.')
			setErrorAddOnPrice('Please add a price for the add-on.')
			return
		}

		if (addOn && !addOnPrice) {
			setErrorAddOnPrice('Please add a price for the add-on.')
			return
		} else if (!addOn && addOnPrice) {
			setErrorAddOn('Please add an add-on.')
			return
		}

		if (addOn && addOnPrice) {
			setAddedAddOns([
				...addedAddOns,
				{ addOn, addOnPrice, id: Date.now().toString(36) },
			])
			setAddOn('')
			setAddOnPrice('')
			setErrorAddOn('')
			setErrorAddOnPrice('')
		}
	}
	return (
		<div>
			<input
				id={fields.addOn.id}
				value={JSON.stringify(addedAddOns)}
				{...conform.input(fields.addOn, { hidden: true })}
				onChange={() => void 0}
			/>

			<div className="grid grid-cols-6 grid-rows-2 items-center gap-x-4">
				<div className="col-span-3">
					<AddOnInput
						label="Add-On"
						placeholder="e.g. Musician, etc."
						isInvalid={Boolean(errorAddOn)}
						onChange={setAddOn}
						value={addOn}
					/>
				</div>
				<div className="col-span-2">
					<AddOnPriceInput
						name="addOnPrice"
						minValue={0}
						label="Add-On Price"
						isInvalid={Boolean(errorAddOnPrice)}
						onChange={setAddOnPrice}
						value={addOnPrice}
						formatOptions={{
							style: 'currency',
							currency: 'USD',
						}}
					/>
				</div>
				<div className="self-end">
					<button
						onClick={handleAddon}
						type="button"
						className={
							!addedAddOns.length
								? 'inline-flex items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-2 text-sm font-semibold text-white opacity-50 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
								: 'inline-flex items-center gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600'
						}
					>
						Add
						<PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
					</button>
				</div>
				<div className="col-span-3">
					<p className="text-sm text-red-600" id="add-on-error">
						{errorAddOn.length > 0 && errorAddOn}
					</p>
				</div>
				<div className="col-span-2">
					{fields.addOn.error || errorAddOnPrice.length > 0 ? null : (
						<p className="text-xs text-slate-400">
							Add-On price cannot exceed $50,000 usd dollars.
						</p>
					)}
					<p className="text-sm text-red-600" id="add-on-price-error">
						{errorAddOnPrice.length > 0 && errorAddOnPrice}
					</p>
				</div>
			</div>

			<AddOnTable addOns={addedAddOns} setAddedAddOns={setAddedAddOns} />
			<div className="mt-6">
				<p className="text-sm text-red-600">{fields.addOn.error}</p>
			</div>
		</div>
	)
}
