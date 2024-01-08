import { useEffect, useMemo, useState } from 'react'
import type { CloudinaryAssets, FileUpload } from '~/types'

import { requestIntent } from '@conform-to/react'
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

	return (
		<>
			<input
				hidden
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
						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
							<div className="text-center">
								<PhotoIcon
									className="mx-auto h-12 w-12 text-slate-300"
									aria-hidden="true"
								/>
								<div className="mt-4 flex text-sm leading-6 text-slate-600">
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
									>
										<span>Upload photos</span>
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
								<p className="text-xs leading-5 text-slate-600">
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
							<div key={file.asset_id}>
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
			<p className="mt-6 text-sm text-red-500">{errorMessage}</p>
		</>
	)
}
