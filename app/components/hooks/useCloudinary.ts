import { useEffect, useState } from 'react'

import { Cloudinary } from '@cloudinary/url-gen'

export const useCloudinary = () => {
	const [cld, setCld] = useState<Cloudinary | null>(null)

	useEffect(() => {
		if (window) {
			const cldInstance = new Cloudinary({
				cloud: {
					cloudName: window.ENV.CLOUDINARY_CLOUD_NAME,
				},
			})

			setCld(cldInstance)
		}
	}, [])

	return { cld }
}
