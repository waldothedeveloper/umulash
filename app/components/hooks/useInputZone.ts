import type { Dispatch, SetStateAction } from 'react'

import { useDropzone } from 'react-dropzone-esm'
import { uploadImages } from '~/routes/upload_files'
import type { CloudinaryAssets } from '~/types'

export const useInputZone = (
	setErrorMessage: Dispatch<SetStateAction<string>>,
	setUploadedFiles: Dispatch<SetStateAction<CloudinaryAssets[]>>,
	setTemporaryFiles: Dispatch<SetStateAction<File[]>>,
	imagesSaved: CloudinaryAssets[] | undefined,
) => {
	const { getRootProps, getInputProps, inputRef, acceptedFiles } = useDropzone({
		onFileDialogOpen() {
			setErrorMessage('')
		},
		accept: {
			'image/*': ['.avif', '.gif', '.heif', '.jpeg', '.png', '.jpg', '.webp'],
		},
		maxFiles: 10,
		async onDrop(acceptedFiles) {
			if (inputRef.current) {
				// remove files from the real input
				inputRef.current.value = ''
			}

			try {
				setTemporaryFiles(acceptedFiles)

				const filesUploadedToCloudinary = (await uploadImages(
					acceptedFiles,
				)) as CloudinaryAssets[] | undefined

				if (!filesUploadedToCloudinary) {
					setErrorMessage('There was an error uploading your images.')
					setTemporaryFiles([])

					return
				}

				if (imagesSaved && imagesSaved.length > 0) {
					setUploadedFiles([...imagesSaved, ...filesUploadedToCloudinary])
				} else {
					setUploadedFiles(filesUploadedToCloudinary)
				}
			} catch (error) {
				// console.log('error on service-photos: ', error)
				if (error instanceof Error) {
					setErrorMessage(error?.message)
				}
				setTemporaryFiles([])
			}
		},
	})

	return { getRootProps, getInputProps, acceptedFiles }
}
