import type { Dispatch, SetStateAction } from 'react'

import { useDropzone } from 'react-dropzone-esm'
import { handleUploadFiles } from '~/utils/handleUploadFiles'

export const useInputZone = (
	setErrorMessage: {
		(value: SetStateAction<string>): void
		(arg0: string): void
	},
	setPendingFiles: Dispatch<
		SetStateAction<
			File[] & {
				secure_url?: string | undefined
				asset_id?: string | undefined
				public_id?: string | undefined
			}
		>
	>,
) => {
	const { getRootProps, getInputProps, inputRef } = useDropzone({
		onFileDialogOpen() {
			setErrorMessage('')
		},
		accept: {
			'image/*': ['.avif', '.gif', '.heif', '.jpeg', '.png', '.jpg', '.webp'],
		},
		maxFiles: 10,
		async onDrop(acceptedFiles) {
			// call a fn here to upload the files to cloudinary
			handleUploadFiles(
				inputRef,
				setPendingFiles,
				setErrorMessage,
				acceptedFiles,
			)
		},
	})

	return { getRootProps, getInputProps }
}
