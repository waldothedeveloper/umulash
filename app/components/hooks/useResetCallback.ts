import { useState } from 'react'

export function useResetCallback<T>(initialValue: T, resetFn: () => any) {
	const [prevValue, setPrevValue] = useState<T>(initialValue)
	if (prevValue !== initialValue) {
		resetFn()
		setPrevValue(initialValue)
	}
}
