import { PhotoIcon } from '@heroicons/react/24/solid'
import { useInputZone } from '~/components/hooks/useInputZone'
import { CloudinaryImageComponent } from '~/components/ui/cloudinaryImage'
import { UploadInput } from '~/components/ui/uploadInput'
// import { useObjectUrls } from '~/components/hooks/useObjectUrl'
import { useState } from 'react'

// import { uploadImages } from '~/routes/upload_files'

//
export const ServicesPhotos = () => {
	const [pendingFiles, setPendingFiles] = useState<
		File[] & { secure_url?: string; asset_id?: string; public_id?: string }
	>([])
	console.log('pendingFiles: ', pendingFiles)
	const [errorMessage, setErrorMessage] = useState('')
	console.log('errorMessage: ', errorMessage)
	const { getRootProps, getInputProps } = useInputZone(
		setErrorMessage,
		setPendingFiles,
	)

	//
	const initialFiles = Array(1)
		.fill(
			<UploadInput getRootProps={getRootProps} getInputProps={getInputProps} />,
		)
		.concat(Array(9).fill(<PhotoIcon className=" text-slate-200" />))

	// const getObjectUrl = useObjectUrls()

	return (
		<>
			<div className="grid auto-rows-fr grid-cols-3 gap-3 md:grid-cols-6 md:gap-4">
				{pendingFiles.length > 0
					? pendingFiles.map((file, idx) => {
							if (file && 'asset_id' in file && 'public_id' in file) {
								// file is an uploaded image
								return (
									<div
										key={file.asset_id as string}
										className="aspect-h-4 aspect-w-4 flex justify-center "
									>
										<CloudinaryImageComponent
											imgSrc={file.public_id as string}
										/>
									</div>
								)
							} else if (file instanceof File) {
								// file is a local File object
								return (
									<div
										key={file.name}
										className="aspect-h-4 aspect-w-4 flex justify-center bg-slate-100 "
									>
										<div role="status">
											<svg
												aria-hidden="true"
												className="h-8 w-8 animate-spin fill-cyan-600 text-slate-200 dark:text-slate-600"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentFill"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>

										{/* <img
								src={getObjectUrl(file)}
								alt={file.name}
								loading="lazy"
								className="h-full w-full rounded-lg object-cover"
							/> */}
									</div>
								)
							} else {
								// file is a dummy div
								return (
									<div
										key={idx}
										className="aspect-h-4 aspect-w-4 flex items-center justify-center rounded-lg border border-dashed border-slate-900/25"
									>
										{file}
									</div>
								)
							}
						})
					: initialFiles.map((file, idx) => {
							if (file && 'asset_id' in file && 'public_id' in file) {
								// file is an uploaded image
								return (
									<div
										key={file.asset_id as string}
										className="aspect-h-4 aspect-w-4 flex justify-center "
									>
										<CloudinaryImageComponent
											imgSrc={file.public_id as string}
										/>
									</div>
								)
							} else if (file instanceof File) {
								// file is a local File object
								return (
									<div
										key={file.name}
										className="aspect-h-4 aspect-w-4 flex justify-center bg-slate-100 "
									>
										<div role="status">
											<svg
												aria-hidden="true"
												className="h-8 w-8 animate-spin fill-cyan-600 text-slate-200 dark:text-slate-600"
												viewBox="0 0 100 101"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
													fill="currentColor"
												/>
												<path
													d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
													fill="currentFill"
												/>
											</svg>
											<span className="sr-only">Loading...</span>
										</div>

										{/* <img
								src={getObjectUrl(file)}
								alt={file.name}
								loading="lazy"
								className="h-full w-full rounded-lg object-cover"
							/> */}
									</div>
								)
							} else {
								// file is a dummy div
								return (
									<div
										key={idx}
										className="aspect-h-4 aspect-w-4 flex items-center justify-center rounded-lg border border-dashed border-slate-900/25"
									>
										{file}
									</div>
								)
							}
						})}
			</div>
			<p className="mt-6 text-sm text-red-500">{errorMessage}</p>
		</>
	)
}
