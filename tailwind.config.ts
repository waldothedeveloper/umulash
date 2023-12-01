import type { Config } from 'tailwindcss'

export default {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
	],
} satisfies Config
