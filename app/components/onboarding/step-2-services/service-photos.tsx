import { PhotoIcon } from '@heroicons/react/24/outline'

// dummy data for now
const files = [
	{
		title: 'Birthday Party',
		size: 'Primary photo',
		source:
			'https://ashfoxphotography.com/wp-content/uploads/2023/06/Ash_Add-onGrid-1.jpg',
	},
	{
		title: 'Add Ons',
		size: 'Secondary photo',
		source:
			'https://ashfoxphotography.com/wp-content/uploads/2023/06/DSC_3183.jpg',
	},
	{
		title: 'Proposal',
		size: 'Secondary photo',
		source: 'https://ashfoxphotography.com/wp-content/uploads/2023/06/1.png',
	},
	{
		title: 'Wedding',
		size: 'Secondary photo',
		source:
			'https://ashfoxphotography.com/wp-content/uploads/2023/06/DSC_2714.jpg',
	},
]

export const ServicesPhotos = () => {
	return (
		<div className="grid grid-cols-4 gap-x-4">
			<div>
				<div className="aspect-h-7 aspect-w-10">
					<label htmlFor="cover-photo" className="sr-only">
						Photo
					</label>
					<div className="flex justify-center rounded-lg border border-dashed border-slate-900/25 px-5 py-8">
						<div className="text-center">
							<PhotoIcon
								className="mx-auto h-12 w-12 text-slate-300"
								aria-hidden="true"
							/>
							<div className="mt-4 flex text-sm leading-6 text-slate-600">
								<label
									htmlFor="file-upload"
									className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
								>
									<span>Upload a photo</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										className="sr-only"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="col-span-3">
				<ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
					{files.map(file => (
						<li key={file.source} className="relative">
							<div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-slate-100 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-100">
								<img
									src={file.source}
									alt="Ash Fox Photography"
									className="pointer-events-none object-cover group-hover:opacity-75"
								/>
								<button
									type="button"
									className="absolute inset-0 focus:outline-none"
								>
									<span className="sr-only">View details for {file.title}</span>
								</button>
							</div>
							<p className="pointer-events-none mt-2 block truncate text-sm font-medium text-slate-900">
								{file.title}
							</p>
							<p className="pointer-events-none block text-sm font-medium text-slate-500">
								{file.size}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
