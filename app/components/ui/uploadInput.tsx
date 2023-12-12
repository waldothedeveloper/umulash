import type { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone-esm'

import { CameraIcon } from '@heroicons/react/24/outline'

export const UploadInput = ({
	getRootProps,
	getInputProps,
}: {
	getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
	getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
}) => {
	return (
		<div {...getRootProps()}>
			<label htmlFor="cover-photo" className="sr-only">
				Photo
			</label>
			<div className="flex h-full items-center justify-center pt-1">
				<div className="text-center">
					<CameraIcon
						className="mx-auto h-8 w-8 text-slate-700"
						aria-hidden="true"
					/>
					<div className="flex text-sm leading-6 text-slate-600">
						<label
							htmlFor="file-upload"
							className="relative cursor-pointer rounded-md bg-white text-sm text-slate-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
						>
							<span>Add a photo</span>
							<input
								{...getInputProps()}
								id="file_upload"
								name="file_upload"
								type="file"
								multiple
								className="sr-only"
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	)
}
