import {
	AdvancedImage,
	lazyload,
	placeholder,
	responsive,
} from '@cloudinary/react'
import { useEffect, useState } from 'react'

import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'

export const CloudinaryImageComponent = ({ imgSrc }: { imgSrc: string }) => {
	const [cld, setCld] = useState<Cloudinary | null>(null)

	useEffect(() => {
		if (window) {
			// Create and configure your Cloudinary instance.
			const cldInstance = new Cloudinary({
				cloud: {
					cloudName: window.ENV.CLOUDINARY_CLOUD_NAME,
				},
			})

			setCld(cldInstance)
		}
	}, [])

	try {
		if (cld) {
			let cldImage = cld.image(imgSrc)
			cldImage.resize(fill().width(190).height(133).gravity(autoGravity()))
			return (
				<AdvancedImage
					cldImg={cldImage}
					plugins={[lazyload(), responsive(), placeholder({ mode: 'blur' })]}
				/>
			)
		}

		throw new Error('Cloudinary Image component could not loaded')
	} catch (error) {
		return <div>Error loading the Image Cloudinary</div>
	}
}
