import { json, redirect } from '@remix-run/node'

import type { ActionFunctionArgs } from '@remix-run/node'
import { v2 as cloudinary } from 'cloudinary'
import { checkUserID } from '~/utils/auth.server'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const action = async (args: ActionFunctionArgs) => {
	const userId = await checkUserID(args)
	if (!userId) {
		return redirect('/')
	}

	if (args.request.method !== 'POST') {
		return json({ message: 'Method not allowed' }, { status: 405 })
	}

	try {
		const { public_id } = await args.request.json()

		if (!public_id) {
			return json({ message: 'No public_id provided' }, { status: 400 })
		}

		const deletedAsset = await cloudinary.uploader
			.destroy(public_id, { invalidate: true })
			.then(result => result)

		if (deletedAsset && deletedAsset.result !== 'ok') {
			return json({
				message: `The image could not be deleted due to: ${deletedAsset?.result}`,
				status: 500,
			})
		}

		return json({ message: 'ok', status: 200 })
	} catch (error) {
		console.log(`error deleting images`, error)
		return json({ message: error, status: 500 })
	}
}
