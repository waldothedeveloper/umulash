import { json, redirect } from '@remix-run/node'

import type { ActionFunctionArgs } from '@remix-run/node'
import type { UploadApiResponse } from 'cloudinary'
import { checkUserID } from '~/utils/auth.server'
// write a remix loader function that will upload the file by calling upload_tocloudinary function from the utils folder to cloudinary and return the url
import { uploadImageToCloudinary } from '~/utils/upload_to_cloudinary.server'

export const action = async (args: ActionFunctionArgs) => {
	const userId = await checkUserID(args)
	if (!userId) {
		return redirect('/')
	}

	if (args.request.method !== 'POST') {
		return json({ message: 'Method not allowed' }, { status: 405 })
	}

	//
	const formData = await args.request.formData()
	const upload = formData.get('file')
	const fileName = formData.get('name')

	if (!(upload instanceof Blob)) {
		throw new Error('Expected a Blob in the file field')
	}

	//
	const reader = upload.stream().getReader()
	const stream: AsyncIterable<Uint8Array> = {
		[Symbol.asyncIterator]: () => {
			return {
				next: async () => {
					const result = await reader.read()
					return { value: result.value || new Uint8Array(), done: result.done }
				},
				return: async () => {
					reader.releaseLock()
					return { value: new Uint8Array(), done: true }
				},
			}
		},
	}

	try {
		const uploadUrl = await uploadImageToCloudinary(stream, String(fileName))
		return uploadUrl
	} catch (error) {
		return json({ error })
	}
}

const getUploadUrl = async (body: FormData) => {
	const response = await fetch(`/upload_files`, {
		method: 'POST',
		body: body,
	}).then(response => response.json())

	return response
}

const uploadImage = async (
	file: File,
): Promise<
	| {
			secure_url?: string
			asset_id?: string
			public_id?: string
			tags: string[]
	  }
	| unknown
> => {
	const body = new FormData()
	body.append('file', file)
	body.append('name', file.name)

	try {
		const uploadedFile: UploadApiResponse = await getUploadUrl(body)
		if ('secure_url' in uploadedFile) {
			const { secure_url, asset_id, public_id, tags } = uploadedFile
			return { secure_url, asset_id, public_id, tags } as const
		} else {
			throw new Error('Upload failed')
		}
	} catch (error) {
		return error
	}
}
// this will receive an array of the files and upload them to cloudinary
export const uploadImages = async (
	files: File[],
): Promise<
	| {
			secure_url?: string
			asset_id?: string
			public_id?: string
			tags: string[]
	  }
	| unknown
> => {
	return await Promise.all(files.map(file => uploadImage(file)))
}
