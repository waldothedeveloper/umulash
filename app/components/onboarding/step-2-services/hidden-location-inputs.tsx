import type { GooglePlaceDisplayData } from '~/types'

export const HiddenLocationInputs = ({
	locationsArray,
}: {
	locationsArray: GooglePlaceDisplayData[]
}) => {
	if (locationsArray.length > 0) {
		return (
			<input
				readOnly
				value={JSON.stringify(locationsArray)}
				name="location"
				hidden
				onChange={() => void 0}
			/>
		)
	}
	return null
}
