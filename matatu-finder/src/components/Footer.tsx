'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
	const pathname = usePathname();

	const navItems = [
		{
			name: 'Home',
			href: '/',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
				</svg>
			)
		},
		{
			name: 'Saved',
			href: '/saved',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
				</svg>
			)
		},
		{
			name: 'Tips',
			href: '/tips',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
				</svg>
			)
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
				</svg>
			)
		}
	];

	return (
		<footer className="sticky bottom-0 border-t" style={{ background: 'var(--color-brand-white)' }}>
			<nav className="flex items-center justify-around py-3 px-4">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.name}
							href={item.href}
							className="flex flex-col items-center gap-1 p-2 min-w-0"
						>
							<div 
								className="transition-colors duration-200"
								style={{ 
									color: isActive ? 'var(--color-brand-primary)' : 'var(--color-brand-accent)' 
								}}
							>
								{item.icon}
							</div>
							<span 
								className="text-xs font-medium transition-colors duration-200"
								style={{ 
									color: isActive ? 'var(--color-brand-primary)' : 'var(--color-brand-accent)' 
								}}
							>
								{item.name}
							</span>
						</Link>
					);
				})}
			</nav>
		</footer>
	);
}
