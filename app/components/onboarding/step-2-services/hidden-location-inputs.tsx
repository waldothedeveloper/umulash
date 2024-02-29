import type { GooglePlaceDisplayData } from '~/types'

export const HiddenLocationInputs = ({
	serverLocations,
	locationsArray,
}: {
	serverLocations: GooglePlaceDisplayData[]
	locationsArray: GooglePlaceDisplayData[]
}) => {
	return (
		<input
			value={JSON.stringify(locationsArray)}
			name="location"
			hidden
			onChange={() => void 0}
		/>
	)
}
