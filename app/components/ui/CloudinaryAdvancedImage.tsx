import {
	AdvancedImage,
	lazyload,
	placeholder,
	responsive,
} from '@cloudinary/react'

import type { CloudinaryImage } from '@cloudinary/url-gen/index'

export const CloudinaryAdvancedImage = ({
	image,
}: {
	image: CloudinaryImage
}) => {
	return (
		<AdvancedImage
			cldImg={image}
			plugins={[
				lazyload(),
				responsive({ steps: 100 }),
				placeholder({ mode: 'predominant-color' }),
			]}
		/>
	)
}
