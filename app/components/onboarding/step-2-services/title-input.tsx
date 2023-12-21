interface TitleInputProps {
	title: any
	conform: any
	required?: boolean
	minlength?: number
	maxlength?: number
	// other props...
}

export const TitleInput: React.FC<TitleInputProps> = ({ title, conform }) => {
	return (
		<>
			<label
				htmlFor={title.id}
				className="block text-sm font-medium leading-6 text-slate-900"
			>
				Title
				<span
					className={title.error ? 'text-red-500' : 'text-slate-900'}
					aria-hidden="true"
				>
					&nbsp;*
				</span>
			</label>
			<div className="mt-2">
				<input
					required
					minLength={2}
					maxLength={50}
					{...conform.input(title, {
						type: 'text',
					})}
					placeholder='e.g. "Bright Love Declaration"'
					className={
						title.error
							? 'block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6'
							: 'block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6'
					}
				/>
			</div>
			<p className="mt-2 text-sm text-red-600" id={title.errorId}>
				{title.error}
			</p>
		</>
	)
}
