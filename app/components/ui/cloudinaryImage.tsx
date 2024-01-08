import {
	AdvancedImage,
	lazyload,
	placeholder,
	responsive,
} from '@cloudinary/react'

import { fill } from '@cloudinary/url-gen/actions/resize'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { useCloudinary } from '~/components/hooks/useCloudinary'

export const CloudinaryImageComponent = ({ imgSrc }: { imgSrc: string }) => {
	const { cld } = useCloudinary()

	try {
		if (cld) {
			let cldImage = cld.image(imgSrc)
			cldImage
				.resize(fill().aspectRatio('3:2').gravity(autoGravity()))
				.roundCorners(byRadius(40))
				.quality('auto')
			return (
				<AdvancedImage
					cldImg={cldImage}
					plugins={[
						lazyload(),
						responsive({ steps: 100 }),
						placeholder({ mode: 'predominant-color' }),
					]}
				/>
			)
		}

		throw new Error('Cloudinary Image component could not loaded')
	} catch (error) {
		return <div>Loading images...</div>
	}
}
