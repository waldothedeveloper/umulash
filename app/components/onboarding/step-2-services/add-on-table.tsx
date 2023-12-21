import { currencyFormatter } from '~/utils/currencyFormatter'

export const AddOnTable = ({
	addOns,
	setAddedAddOns,
}: {
	addOns: { addOn: string; addOnPrice: string; id: string }[]
	setAddedAddOns: React.Dispatch<
		React.SetStateAction<{ addOn: string; addOnPrice: string; id: string }[]>
	>
}) => {
	return (
		<div>
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-slate-900">
						Added Add-Ons
					</h1>
					<p className="mt-2 text-sm text-slate-700">
						The add-ons will appear here once you add them. To add an add-on,
						fill the add-on and add-on price fields above and, click the add
						button.
					</p>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-slate-300">
							<thead>
								<tr className="divide-x divide-slate-200">
									<th
										scope="col"
										className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-slate-900 sm:pl-0"
									>
										Add-On
									</th>
									<th
										scope="col"
										className="px-4 py-3.5 text-left text-sm font-semibold text-slate-900"
									>
										Price{' '}
										<span className="font-normal text-slate-500">(usd)</span>
									</th>
									<th
										scope="col"
										className="px-4 py-3.5 text-left text-sm font-semibold text-slate-900"
									>
										Action
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-200 bg-white">
								{addOns.map(data => (
									<tr key={data.id} className="divide-x divide-slate-200">
										<td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-slate-900 sm:pl-0">
											{data.addOn}
										</td>
										<td className="whitespace-nowrap p-4 text-sm text-slate-500">
											{currencyFormatter.format(parseFloat(data.addOnPrice))}
										</td>
										<td className="whitespace-nowrap p-4">
											<button
												className="px-3 py-2 text-sm text-slate-500 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
												onClick={() => {
													const index = addOns.findIndex(
														addOn => addOn.addOn === data.addOn,
													)
													const newAddOns = [...addOns]
													newAddOns.splice(index, 1)
													setAddedAddOns(newAddOns)
												}}
												type="button"
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
