import { writeAsyncIterableToWritable } from '@remix-run/node'
import type { UploadApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImageToCloudinary = async (
	data: AsyncIterable<Uint8Array>,
	fileName: string,
) => {
	const uploadPromise = new Promise<UploadApiResponse>(
		async (resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					folder: 'service_images',
					tags: [fileName],
				},
				(error, uploadResult) => {
					if (error) {
						reject(error)
						return
					}
					if (!uploadResult) {
						reject(
							new Error(
								'Something went wrong getting a uploadResult from cloudinary',
							),
						)
						return
					}
					resolve(uploadResult)
				},
			)
			await writeAsyncIterableToWritable(data, uploadStream)
		},
	)

	return uploadPromise
}
