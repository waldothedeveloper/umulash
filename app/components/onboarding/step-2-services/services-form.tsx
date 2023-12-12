import type { Fieldset } from '@conform-to/react'
import { ServicesPhotoDetails } from '~/components/onboarding/step-2-services/photo-details'
import { ServicesDetails } from '~/components/onboarding/step-2-services/service-details'
import { ServicesPhotos } from '~/components/onboarding/step-2-services/service-photos'
import type { ServiceDetails } from '~/types/index'

export default function ServicesForm({
	conform,
	fields,
	categories,
	form,
}: {
	conform: any
	fields: Fieldset<ServiceDetails>
	categories: any
	form: any
}) {
	return (
		<div className="space-y-10">
			<div className="grid grid-cols-1 gap-x-8 gap-y-8 p-8 shadow-sm ring-1 ring-slate-900/10 sm:rounded-lg md:grid-cols-3">
				<ServicesPhotoDetails />
				<div className="md:col-span-2">
					<div className="sm:p-8 md:px-4 md:py-6">
						<ServicesPhotos />
					</div>
				</div>
			</div>
			<ServicesDetails
				conform={conform}
				fields={fields}
				categories={categories}
			/>
		</div>
	)
}
