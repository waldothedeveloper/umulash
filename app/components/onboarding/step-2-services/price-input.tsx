export const PriceInput = ({
	price,
	conform,
}: {
	price: any
	conform: any
}) => {
	return (
		<>
			<div>
				<label
					htmlFor={price.id}
					className="block text-sm font-medium leading-6 text-slate-900"
				>
					Price
					<span
						className={price.error ? 'text-red-500' : 'text-slate-900'}
						aria-hidden="true"
					>
						&nbsp;*
					</span>
				</label>
				<div className="relative mt-2 rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<span
							className={
								price.error
									? 'text-red-500 sm:text-sm'
									: 'text-slate-500 sm:text-sm'
							}
						>
							$
						</span>
					</div>
					<input
						step="0.01"
						placeholder="99.99"
						{...conform.input(price, {
							type: 'number',
						})}
						className={
							price.error
								? 'block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
								: 'block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
						}
					/>
					<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span
							className={
								price.error
									? 'text-red-500 sm:text-sm'
									: 'text-slate-500 sm:text-sm'
							}
							id={price.errorId}
						>
							USD
						</span>
					</div>
				</div>
			</div>
			<p className="mt-2 text-sm text-red-600" id={`${price.errorId}`}>
				{price.error}
			</p>
			<p
				id={price.descriptionId}
				className="mt-3 text-sm leading-6 text-slate-600"
			>
				Price your service competitively to attract more clients. Consider
				including additional add-ons to increase your average order value.
			</p>
		</>
	)
}
