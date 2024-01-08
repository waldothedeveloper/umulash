import { CloudinaryAdvancedImage } from '~/components/ui/CloudinaryAdvancedImage'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { useCloudinary } from '~/components/hooks/useCloudinary'

export const WelcomeImages = ({ imageName }: { imageName: string }) => {
	const { cld } = useCloudinary()
	let cldImage = cld && cld.image(imageName)
	cldImage &&
		cldImage
			.resize(fill().aspectRatio('2:3').gravity(autoGravity()))
			.roundCorners(byRadius(100))
			.quality('auto')
	// .effect(shadow().strength(90).color('#164e63').offsetX(5).offsetY(5))

	return cldImage && <CloudinaryAdvancedImage image={cldImage} />
}
