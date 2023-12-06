import type { GooglePlaceDisplayData, ServiceDetails } from '~/types'

import type { Fieldset } from '@conform-to/react'

export const HiddenLocationInputs = ({
	conform,
	fields,
	locationsArray,
}: {
	conform: any
	fields: Fieldset<ServiceDetails>
	locationsArray: GooglePlaceDisplayData[]
}) => {
	return (
		<>
			{locationsArray.length > 0 ? (
				locationsArray.map((location, index) => {
					return (
						<input
							key={index}
							value={location.description}
							readOnly
							{...conform.input(fields.location, {
								hidden: true,
								type: 'text',
							})}
						/>
					)
				})
			) : (
				<input
					{...conform.input(fields.location, {
						hidden: true,
						type: 'text',
					})}
				/>
			)}
		</>
	)
}
