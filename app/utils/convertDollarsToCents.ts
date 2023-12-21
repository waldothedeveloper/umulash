export const convertDollarsToCents = function (value: string) {
	if (!value) throw new Error('A value in dollars is required')
	value = (value + '').replace(/[^\d.-]/g, '')
	if (value && value.includes('.')) {
		value = value.substring(0, value.indexOf('.') + 3)
	}

	return value ? Math.round(parseFloat(value) * 100) : 0
}
