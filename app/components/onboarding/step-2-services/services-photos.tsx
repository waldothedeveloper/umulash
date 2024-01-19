import { useEffect, useMemo, useState } from 'react'
import type { CloudinaryAssets, FileUpload } from '~/types'

import { requestIntent } from '@conform-to/react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { useInputZone } from '~/components/hooks/useInputZone'
import { useObjectUrls } from '~/components/hooks/useObjectUrl'
import { CloudinaryImageComponent } from '~/components/ui/cloudinaryImage'
import { ImageWithPlaceholder } from '~/components/ui/imageWithPlaceholder'
import { UploadInput } from '~/components/ui/uploadInput'

// import { useResetCallback } from '~/components/hooks/useResetCallback'

export const ServicesPhotos = ({
	form,
	imagesSaved,
	errors,
}: {
	form: any
	imagesSaved: FileUpload | undefined
	errors: any
}) => {
	const [uploadedFiles, setUploadedFiles] = useState<CloudinaryAssets[]>([])
	const [temporaryFiles, setTemporaryFiles] = useState<File[]>([])
	const [errorMessage, setErrorMessage] = useState('')
	const { getRootProps, getInputProps } = useInputZone(
		setErrorMessage,
		setUploadedFiles,
		setTemporaryFiles,
		imagesSaved,
	)

	useMemo(() => {
		if (imagesSaved && imagesSaved.length === uploadedFiles.length) {
			setTemporaryFiles([])
		}
	}, [imagesSaved, uploadedFiles])

	useEffect(() => {
		if (uploadedFiles.length > 0) {
			requestIntent(form.ref.current, {
				value: 'validate/file_upload',
			})
		}
	}, [uploadedFiles, form.ref])

	const getObjectUrl = useObjectUrls()

	const deleteImage = async (asset_id: string) => {
		if (!asset_id) throw new Error('No asset_id provided')

		try {
			const selectedImage =
				imagesSaved && imagesSaved.find(image => image.asset_id === asset_id)

			const newImagesSaved =
				imagesSaved && imagesSaved.filter(image => image.asset_id !== asset_id)

			if (newImagesSaved) {
				setUploadedFiles(newImagesSaved)
			} else {
				setUploadedFiles([])
			}

			const deletedImage = await fetch(`/delete_images`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({ public_id: selectedImage?.public_id }),
			}).then(response => response.json())

			if (deletedImage.status === 200) {
				setErrorMessage('')
				requestIntent(form.ref.current, {
					value: 'validate/file_upload',
				})
			} else {
				setErrorMessage(`Something went wrong. ${deletedImage.message}`)
			}
			return deletedImage
		} catch (error) {
			return error
		}
	}

	return (
		<>
			<input
				hidden
				required
				type="text"
				name="file_upload"
				value={JSON.stringify(uploadedFiles)}
				readOnly
				onChange={() => void 0}
			/>
			{imagesSaved &&
				!imagesSaved.length &&
				!uploadedFiles.length &&
				!temporaryFiles.length && (
					<div className="col-span-full" {...getRootProps()}>
						<label
							htmlFor="cover-photo"
							className="block text-sm font-medium leading-6 text-slate-900"
						>
							Add some photos
						</label>
						<div
							className={
								errorMessage || errors?.initialError['']
									? 'mt-2 flex justify-center rounded-lg border border-dashed border-red-500 px-6 py-10'
									: 'mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10'
							}
						>
							<div className="text-center">
								<PhotoIcon
									className={
										errorMessage || errors?.initialError['']
											? 'mx-auto h-12 w-12 text-red-300'
											: 'mx-auto h-12 w-12 text-slate-300'
									}
									aria-hidden="true"
								/>
								<div
									className={
										errorMessage || errors?.initialError['']
											? 'mt-4 flex text-sm leading-6 text-red-500'
											: 'mt-4 flex text-sm leading-6 text-slate-600'
									}
								>
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
									>
										<span
											className={
												errorMessage ||
												(errors?.initialError[''] && 'text-red-500')
											}
										>
											Upload photos
										</span>
										<input
											{...getInputProps()}
											id="file-upload"
											name="file-upload"
											type="file"
											className="sr-only"
										/>
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p
									className={
										errorMessage || errors.initialError['']
											? 'text-xs leading-5 text-red-500'
											: 'text-xs leading-5 text-slate-600'
									}
								>
									PNG, JPG, GIF up to 10MB
								</p>
							</div>
						</div>
					</div>
				)}
			<div className="grid  grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
				{imagesSaved &&
					Array.isArray(imagesSaved) &&
					imagesSaved.length > 0 &&
					imagesSaved.map(file => {
						return (
							<div className="relative" key={file.asset_id}>
								<div className="absolute right-0 p-2">
									<button
										onClick={async () => await deleteImage(file.asset_id)}
										type="button"
										className="rounded-full bg-slate-100 p-1.5 text-slate-800 opacity-90 shadow-sm hover:bg-red-500 hover:text-white hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
									>
										<TrashIcon className="h-4 w-4" aria-hidden="true" />
									</button>
								</div>
								<CloudinaryImageComponent imgSrc={file.public_id} />
							</div>
						)
					})}

				{temporaryFiles.map((file, idx) => {
					return (
						<div key={idx}>
							<ImageWithPlaceholder
								src=""
								placeholderSrc={getObjectUrl(file)}
								className="aspect-[3/2] h-full w-full animate-pulse rounded-lg object-cover"
							/>
						</div>
					)
				})}
				{(imagesSaved && imagesSaved.length > 0 && imagesSaved.length < 10) ||
				(temporaryFiles.length > 0 && temporaryFiles.length < 10) ||
				(uploadedFiles.length > 0 && uploadedFiles.length < 10) ? (
					<UploadInput
						getRootProps={getRootProps}
						getInputProps={getInputProps}
					/>
				) : null}
			</div>
			<p className="mt-6 text-sm text-red-500">
				{errorMessage || errors?.initialError['']}
			</p>
		</>
	)
}
