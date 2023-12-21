import { PhotoIcon } from '@heroicons/react/24/solid'
import { useInputZone } from '~/components/hooks/useInputZone'
import { PhotosCarousel } from '~/components/onboarding/step-2-services/photos-carousel'
import { UploadInput } from '~/components/ui/uploadInput'
// import { useObjectUrls } from '~/components/hooks/useObjectUrl'
import { useState } from 'react'

export const ServicesPhotos = () => {
	const [pendingFiles, setPendingFiles] = useState<
		File[] & { secure_url?: string; asset_id?: string; public_id?: string }
	>([])
	const [errorMessage, setErrorMessage] = useState('')
	const { getRootProps, getInputProps } = useInputZone(
		setErrorMessage,
		setPendingFiles,
	)

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
							return (
								// we need to work on passing a better key later
								<div key={idx}>
									<PhotosCarousel file={file} />
								</div>
							)
						})
					: initialFiles.map((file, idx) => {
							return (
								// we need to work on passing a better key later
								<div key={idx}>
									<PhotosCarousel file={file} />
								</div>
							)
						})}
			</div>
			<p className="mt-6 text-sm text-red-500">{errorMessage}</p>
		</>
	)
}
