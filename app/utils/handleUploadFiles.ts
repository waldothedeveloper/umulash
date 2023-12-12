import type { RefObject, SetStateAction } from 'react'

import { uploadImages } from '~/routes/upload_files'

export const handleUploadFiles = async (
	ref: RefObject<HTMLInputElement>,
	setFiles: {
		(
			value: SetStateAction<
				File[] & {
					secure_url?: string | undefined
					asset_id?: string | undefined
					public_id?: string | undefined
				}
			>,
		): void
		(arg0: never[]): void
	},
	setError: {
		(value: SetStateAction<string>): void
		(arg0: string): void
		(arg0: string): void
	},
	acceptedFiles: File[],
) => {
	try {
		if (ref.current) {
			// remove files from the real input
			ref.current.value = ''
		}

		const filesUploadedToCloudinary = await uploadImages(acceptedFiles)
		console.log('filesUploadedToCloudinary: ', filesUploadedToCloudinary)
	} catch (error) {
		console.log('error on service-photos: ', error)
		if (error instanceof Error) {
			setError(error.message)
		}
		setFiles([])
	}
}
