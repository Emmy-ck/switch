'use client';

import { useState } from 'react';
import { ResultsPage } from '@/components';
import { routes } from '@/lib/data';
import type { RouteMatch } from '@/lib/types';

// Mock search results for demonstration
const mockRouteMatches: RouteMatch[] = [
	{
		route: routes[0], // 46A CBD → Kawangware
		fromStopId: "CBD_Archives",
		toStopId: "Kawangware",
		stopsBetween: ["Kencom", "Westlands"],
		estimatedFare: 60,
	},
	{
		route: routes[4], // 105 CBD → Westlands → Kikuyu
		fromStopId: "CBD_Archives",
		toStopId: "Westlands",
		stopsBetween: [],
		estimatedFare: 50,
	},
	{
		route: routes[1], // 111 CBD → Ngong
		fromStopId: "Railways",
		toStopId: "Karen",
		stopsBetween: ["UpperHill"],
		estimatedFare: 80,
	},
];

export default function ResultsDemo() {
	return (
		<div className="min-h-screen" style={{ background: 'var(--color-brand-light)' }}>
			{/* Header Navigation */}
			<header className="sticky top-0 z-50" style={{ background: 'var(--color-brand-white)' }}>
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<div className="flex items-center gap-3">
						<button className="p-2">
							<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<h1 className="text-xl font-bold" style={{ color: 'var(--color-brand-dark)' }}>
							Matatu Finder
						</h1>
					</div>
					<div className="flex items-center gap-2">
						<button className="p-2">
							<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
						</button>
						<button className="p-2">
							<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Search/Filter Section */}
			<div className="px-4 py-4" style={{ background: 'var(--color-brand-white)' }}>
				<div className="flex items-center gap-3 mb-4">
					<div className="flex-1 relative">
						<input
							type="text"
							placeholder="From: CBD - National Archives"
							className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
						/>
						<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
							<svg className="w-5 h-5" style={{ color: 'var(--color-brand-accent)' }} fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
							</svg>
						</div>
					</div>
					<button className="p-3 rounded-lg" style={{ background: 'var(--color-brand-primary)' }}>
						<svg className="w-5 h-5" style={{ color: 'var(--color-brand-white)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
						</svg>
					</button>
				</div>
				
				<div className="flex-1 relative">
					<input
						type="text"
						placeholder="To: Kawangware"
						className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
					/>
					<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<svg className="w-5 h-5" style={{ color: 'var(--color-brand-accent)' }} fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
						</svg>
					</div>
				</div>

				{/* Filter Options */}
				<div className="flex items-center gap-3 mt-4">
					<button className="px-4 py-2 rounded-full border border-gray-200 text-sm" style={{ color: 'var(--color-brand-dark)' }}>
						Fastest
					</button>
					<button className="px-4 py-2 rounded-full border border-gray-200 text-sm" style={{ color: 'var(--color-brand-dark)' }}>
						Cheapest
					</button>
					<button className="px-4 py-2 rounded-full text-sm" style={{ background: 'var(--color-brand-primary)', color: 'var(--color-brand-white)' }}>
						Best Route
					</button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1">
				<ResultsPage 
					routes={mockRouteMatches}
					searchQuery={{
						from: "CBD - National Archives",
						to: "Kawangware"
					}}
				/>
			</div>

			{/* Bottom Navigation */}
			<nav className="sticky bottom-0 border-t" style={{ background: 'var(--color-brand-white)' }}>
				<div className="flex items-center justify-around py-3">
					<button className="flex flex-col items-center gap-1 p-2">
						<svg className="w-6 h-6" style={{ color: 'var(--color-brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
						</svg>
						<span className="text-xs font-medium" style={{ color: 'var(--color-brand-primary)' }}>Home</span>
					</button>
					
					<button className="flex flex-col items-center gap-1 p-2">
						<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Search</span>
					</button>
					
					<button className="flex flex-col items-center gap-1 p-2">
						<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
						</svg>
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Map</span>
					</button>
					
					<button className="flex flex-col items-center gap-1 p-2">
						<svg className="w-6 h-6" style={{ color: 'var(--color-brand-dark)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Settings</span>
					</button>
				</div>
			</nav>
		</div>
	);
}
