import { SignUp } from '@clerk/remix'
export default function SignUpPage() {
	return (
		<SignUp
			appearance={{
				elements: {
					rootBox: 'z-0',
					formButtonPrimary: 'bg-cyan-400 hover:bg-cyan-500',
				},
			}}
		/>
	)
}
