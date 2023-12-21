import type { FieldConfig } from '@conform-to/react'

export const CustomCategoryInput = ({
	custom_category,
	conform,
	category,
}: {
	custom_category: FieldConfig<string>
	conform: any
	category: FieldConfig<string>
}) => {
	return (
		<>
			<label className="block text-sm font-medium leading-6 text-slate-900">
				Custom Category
				{custom_category.error && (
					<span className="text-red-500" aria-hidden="true">
						&nbsp;*
					</span>
				)}
			</label>
			<div className="relative mt-2 rounded-md shadow-sm">
				<input
					disabled={
						category?.defaultValue ? category.defaultValue.length > 0 : false
					}
					{...conform.input(custom_category, {
						type: 'text',
					})}
					placeholder='e.g. "Marry Me Sign Proposal"'
					className={
						custom_category.error
							? 'mr-4 block w-full rounded-md border-0 py-1.5 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: category?.defaultValue && category?.defaultValue.length > 0
								? 'mr-4 block w-full rounded-md border-0 bg-slate-200 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
								: 'mr-4 block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
			<p className="mt-2 text-sm text-red-600" id={custom_category.errorId}>
				{custom_category.error}
			</p>
			<p
				id={custom_category.descriptionId}
				className="mt-3 text-sm leading-6 text-slate-600"
			>
				Create a custom category only if your service doesn't fit into any of
				the categories above.
			</p>
		</>
	)
}
