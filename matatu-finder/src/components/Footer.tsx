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
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
				</svg>
			)
		},
		{
			name: 'Tips',
			href: '/tips',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
				</svg>
			)
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: (
				<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
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
