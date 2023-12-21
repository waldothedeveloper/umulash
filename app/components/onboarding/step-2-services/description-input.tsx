export const DescriptionInput = ({
	description,
	conform,
}: {
	description: any
	conform: any
}) => {
	return (
		<>
			<label
				htmlFor={description.id}
				className="block text-sm font-medium leading-6 text-slate-900"
			>
				Description
				<span
					className={description.error ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</label>
			<div className="mt-2">
				<textarea
					required
					minLength={2}
					maxLength={250}
					{...conform.input(description)}
					rows={5}
					className={
						description.error
							? 'block w-full max-w-2xl rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'block w-full max-w-2xl rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
			<p className="mt-2 text-sm text-red-600" id={description.errorId}>
				{description.error}
			</p>
			<p
				id={description.descriptionId}
				className="mt-3 text-sm leading-6 text-slate-600"
			>
				Name your package uniquely, highlight key features, and evoke emotion.
				Specify logistics, note date restrictions, and consider additional
				add-ons. Your perfect service proposal begins here!
			</p>
		</>
	)
}
