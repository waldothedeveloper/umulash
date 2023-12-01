import { NavLink } from '@remix-run/react'
import type { OnboardingSteps } from '~/types/index'

export default function Stepper({ steps }: OnboardingSteps) {
	return (
		<nav aria-label="Progress">
			<ol className="space-y-4 md:flex md:space-x-8 md:space-y-0">
				{steps?.map(step => (
					<li key={step.name} className="md:flex-1">
						{step.status === 'complete' ? (
							<NavLink
								to={step.href}
								className="group flex flex-col border-l-4 border-cyan-600 py-2 pl-4 hover:border-cyan-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
							>
								<span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">
									{step.id}
								</span>
								<span className="text-base font-medium">{step.name}</span>
								<span className="hidden pt-2 text-sm text-slate-400 md:inline-block">
									{step.description}
								</span>
							</NavLink>
						) : step.status === 'current' ? (
							<NavLink
								to={step.href}
								className="flex flex-col border-l-4 border-cyan-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
								aria-current="step"
							>
								<span className="text-sm font-medium text-slate-600">
									{step.id}
								</span>
								<span className="text-base font-medium">{step.name}</span>
								<span className="hidden pt-2 text-sm text-slate-400 md:inline-block">
									{step.description}
								</span>
							</NavLink>
						) : (
							<NavLink
								to={step.href}
								className="group flex flex-col border-l-4 border-slate-200 py-2 pl-4 hover:border-slate-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
							>
								<span className="text-sm font-medium text-slate-500 group-hover:text-slate-700">
									{step.id}
								</span>
								<span className="text-base font-medium">{step.name}</span>
								<span className="hidden pt-2 text-sm text-slate-400 md:inline-block">
									{step.description}
								</span>
							</NavLink>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}
