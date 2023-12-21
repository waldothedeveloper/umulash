export const convertCentsToDollars = (value: string | number): string => {
	if (!value) throw new Error('A value in cents is required')
	let cents =
		typeof value === 'string'
			? parseInt(value.replace(/[^\d.-]/g, ''), 10)
			: value
	let dollars = cents / 100
	return dollars.toFixed(2)
}
