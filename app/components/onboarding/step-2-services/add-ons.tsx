import { useEffect, useState } from 'react'

import { requestIntent } from '@conform-to/react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { AddOnTable } from '~/components/onboarding/step-2-services/add-on-table'
import { AddOnPriceInput } from '~/components/ui/addOnPriceTextField'
import { AddOnInput } from '~/components/ui/addOnTextField'

export default function AddOns({ add_On, form }: { add_On: any; form: any }) {
	const [addOn, setAddOn] = useState('')
	const [addOnPrice, setAddOnPrice] = useState('')
	const [errorAddOn, setErrorAddOn] = useState('')
	const [errorAddOnPrice, setErrorAddOnPrice] = useState('')
	const [addedAddOns, setAddedAddOns] = useState<
		{ addOn: string; addOnPrice: string; id: string }[]
	>([])

	useEffect(() => {
		if (add_On.defaultValue) {
			const addOnsFromLoader = JSON.parse(add_On.defaultValue)
			setAddedAddOns(addOnsFromLoader)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		requestIntent(form.ref.current, {
			value: 'validate/add_On',
		})
	}, [addedAddOns, form.ref])

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
				hidden
				readOnly
				id={add_On.id}
				value={JSON.stringify(addedAddOns)}
				type="text"
				name="add_On"
				aria-hidden="true"
			/>

			<div className="grid grid-rows-2 items-center gap-x-4 md:grid-cols-6">
				<div className="col-span-2 md:col-span-3">
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
						disabled={!addedAddOns.length && !addOn && !addOnPrice}
						onClick={handleAddon}
						type="button"
						className={
							!addedAddOns.length && !addOn && !addOnPrice
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
				<div className="col-span-2 mt-2 md:mt-0">
					{add_On.error || errorAddOnPrice.length > 0 ? null : (
						<p className="text-xs text-slate-400">
							Add-On price cannot exceed $50,000 usd dollars.
						</p>
					)}
					<p className="text-sm text-red-600" id="add-on-price-error">
						{errorAddOnPrice.length > 0 && errorAddOnPrice}
					</p>
				</div>
			</div>

			<div className="mt-6 md:mt-0">
				<AddOnTable addOns={addedAddOns} setAddedAddOns={setAddedAddOns} />
			</div>
			<div className="mt-6">
				<p id={add_On.errorId} className="text-sm text-red-600">
					{add_On.error}
				</p>
			</div>
		</div>
	)
}
