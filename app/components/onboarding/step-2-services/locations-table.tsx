import { XMarkIcon } from '@heroicons/react/24/outline'
import type { GooglePlaceDisplayData } from '~/types/index'

export const LocationTable = ({
	locations,
	setLocation,
}: {
	locations: GooglePlaceDisplayData[]
	setLocation: React.Dispatch<React.SetStateAction<GooglePlaceDisplayData[]>>
}) => {
	return (
		<div className="my-4 grid grid-cols-3 gap-3">
			{locations.map((location, index) => {
				return (
					<div
						key={location.id}
						className={`flex items-center justify-between gap-x-1.5 rounded-md bg-cyan-600 px-2.5 py-1.5 pr-2 text-xs font-semibold text-white shadow-sm`}
					>
						{location.description}
						<button
							onClick={() =>
								setLocation(currLocation =>
									currLocation.filter(element => element.id !== location.id),
								)
							}
							type="button"
							className={`ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-cyan-400 hover:bg-cyan-900 hover:text-cyan-900 dark:hover:bg-cyan-800 dark:hover:text-cyan-300`}
							data-dismiss-target="#badge-dismiss-default"
							aria-label="Remove"
						>
							<XMarkIcon className="h-4 w-4 text-white" aria-hidden="true" />
							<span className="sr-only">Remove badge</span>
						</button>
					</div>
				)
			})}
		</div>
	)
}
