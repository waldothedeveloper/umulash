import { json, redirect } from '@remix-run/node'

import type { DataFunctionArgs } from '@remix-run/node'
import { v4 as uuidv4 } from 'uuid'
import type { GoogleMapsPlaceAutoComplete } from '~/types/index'
import { checkUserID } from '~/utils/auth.server'

export const loader = async (args: DataFunctionArgs) => {
	const search = new URL(args.request.url).searchParams.get('search')
	const userId = await checkUserID(args)
	const apiKey = process.env.GOOGLE_MAPS_API_KEY

	if (!userId) {
		return redirect('/')
	}

	if (!apiKey) {
		return json({ message: 'no api key provided or erroneous api key' })
	}

	if (!search) {
		return json({ message: 'no search param provided' })
	}

	try {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&components=country:us&types=%28cities%29&key=${apiKey}`,
		)

		const data: GoogleMapsPlaceAutoComplete = await response.json()

		const { status } = data

		if (status === 'ZERO_RESULTS') {
			return json({ message: 'No places found for your query.' })
		}

		if (status === 'REQUEST_DENIED') {
			return json({
				message: 'Request denied. Try again later, or contact support.',
			})
		}

		if ('predictions' in data) {
			const locations = data.predictions.map(prediction => {
				const description = prediction.description

				const location = {
					id: uuidv4(),
					description: description,
				}

				return location
			})

			return json(locations)
		}

		return json({ message: 'no places' })
	} catch (error) {
		console.log('error: ', error)
		return json({ error: error })
	}
}
