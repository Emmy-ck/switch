'use client';

import { useState } from 'react';
import type { RouteMatch, MultiLegRouteMatch } from '@/lib/types';
import { getStopById } from '@/lib/data';

type Props = {
	routes: RouteMatch[];
	multiLegRoutes?: MultiLegRouteMatch[];
	searchQuery?: {
		from: string;
		to: string;
	};
};

export default function ResultsPage({ routes, multiLegRoutes = [], searchQuery }: Props) {
	const sortedRoutes = [...routes].sort((a, b) => a.estimatedFare - b.estimatedFare);
	const mainRoute = sortedRoutes[0];
	const alternativeRoutes = sortedRoutes.slice(1);

	return (
		<div className="min-h-screen" style={{ background: 'var(--color-brand-light)' }}>
			<div className="max-w-7xl mx-auto p-6">
				{/* Header */}
				<h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-brand-dark)' }}>
					Results page
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Main Route Card - Left Side */}
					<div className="lg:col-span-2">
						{mainRoute && <MainRouteCard match={mainRoute} />}
						
						{/* Description */}
						<div className="mt-6 p-4 rounded-lg" style={{ background: 'var(--color-brand-white)' }}>
							<p style={{ color: 'var(--color-brand-dark)' }} className="text-sm leading-relaxed">
								Main route is expanded with all the key details shown at a glance. The user can quickly 
								see time, fare, matatu number and Sacco name.
							</p>
						</div>
					</div>

					{/* Alternative Routes - Right Side */}
					<div className="lg:col-span-1">
						<div className="p-4 rounded-lg" style={{ background: 'var(--color-brand-primary)' }}>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-lg font-semibold" style={{ color: 'var(--color-brand-white)' }}>
									Available routes
								</h2>
								<div className="flex items-center gap-2" style={{ color: 'var(--color-brand-white)' }}>
									<span className="text-sm">Kencom</span>
									<div className="flex items-center gap-1">
										<div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-brand-white)' }}></div>
										<div className="w-8 h-px border-t-2 border-dashed" style={{ borderColor: 'var(--color-brand-white)' }}></div>
										<div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-brand-white)' }}></div>
									</div>
									<span className="text-sm">Umoja 1</span>
								</div>
							</div>

							<div className="space-y-3">
								{alternativeRoutes.map((route, index) => (
									<AlternativeRouteCard key={index} match={route} />
								))}
							</div>
						</div>

						{/* Description */}
						<div className="mt-6 p-4 rounded-lg" style={{ background: 'var(--color-brand-white)' }}>
							<p style={{ color: 'var(--color-brand-dark)' }} className="text-sm leading-relaxed">
								Alternative routes are shown below the main route with simplified details to reduce 
								information overload the card can expand if the user selects it.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function MainRouteCard({ match }: { match: RouteMatch }) {
	const { route, fromStopId, toStopId, estimatedFare } = match;
	const fromStop = getStopById(fromStopId);
	const toStop = getStopById(toStopId);

	return (
		<div className="rounded-lg p-6" style={{ background: 'var(--color-brand-white)' }}>
			{/* Header Icons */}
			<div className="flex items-center gap-4 mb-6">
				<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-primary)' }}>
					<svg className="w-4 h-4" style={{ color: 'var(--color-brand-white)' }} fill="currentColor" viewBox="0 0 20 20">
						<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
					</svg>
				</div>
				<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
					<svg className="w-4 h-4" style={{ color: 'var(--color-brand-white)' }} fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
					</svg>
				</div>
				<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
					<svg className="w-4 h-4" style={{ color: 'var(--color-brand-white)' }} fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
					</svg>
				</div>
				<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
					<svg className="w-4 h-4" style={{ color: 'var(--color-brand-white)' }} fill="currentColor" viewBox="0 0 20 20">
						<path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
					</svg>
				</div>
				<div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
					<svg className="w-4 h-4" style={{ color: 'var(--color-brand-white)' }} fill="currentColor" viewBox="0 0 20 20">
						<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
					</svg>
				</div>
			</div>

			{/* Route Details */}
			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Ummonner / Utime</span>
					</div>
					<div className="text-2xl font-bold" style={{ color: 'var(--color-brand-dark)' }}>35/60</div>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Location</span>
					</div>
					<div className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Tusker/ Ronald Ngala</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Travel time</span>
					</div>
					<div className="text-sm" style={{ color: 'var(--color-brand-dark)' }}>
						<span className="font-bold">10:00 AM-10:45 AM</span> | 45 min
					</div>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Estimated fare</span>
					</div>
					<div className="text-sm font-bold" style={{ color: 'var(--color-brand-dark)' }}>60-100 KES</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-6 mb-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Pick Hours</span>
					</div>
					<div className="text-sm font-bold" style={{ color: 'var(--color-brand-dark)' }}>4:00 PM - 8:00 PM</div>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span className="text-sm font-medium" style={{ color: 'var(--color-brand-dark)' }}>Connections</span>
					</div>
					<div className="text-2xl font-bold" style={{ color: 'var(--color-brand-dark)' }}>1</div>
				</div>
			</div>

			{/* Route Visualization */}
			<div className="mt-6">
				<div className="flex items-center justify-center gap-4 p-4 rounded-lg" style={{ background: 'var(--color-brand-light)' }}>
					<div className="text-center">
						<div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ background: 'var(--color-brand-primary)' }}>
							<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>46H</span>
						</div>
						<div className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Huruma sacco</div>
					</div>
					
					<div className="flex items-center gap-2">
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Travel time</span>
						<div className="text-xs font-bold" style={{ color: 'var(--color-brand-dark)' }}>50 min</div>
					</div>
					
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--color-brand-primary)' }}>
							<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>46H</span>
						</div>
						<svg className="w-4 h-4" style={{ color: 'var(--color-brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
						</svg>
						<div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
							<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>17AYK</span>
						</div>
						<svg className="w-4 h-4" style={{ color: 'var(--color-brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
						</svg>
						<div className="w-4 h-4 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

function AlternativeRouteCard({ match }: { match: RouteMatch }) {
	const { route, estimatedFare } = match;

	return (
		<div className="p-3 rounded-lg" style={{ background: 'var(--color-brand-white)' }}>
			<div className="grid grid-cols-3 gap-3 text-xs">
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Ummonner / Utime</span>
					</div>
					<div className="font-bold" style={{ color: 'var(--color-brand-dark)' }}>35/60</div>
				</div>
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Location</span>
					</div>
					<div className="font-medium" style={{ color: 'var(--color-brand-dark)' }}>Tusker/ Ronald Ngala</div>
				</div>
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Travel time</span>
					</div>
					<div style={{ color: 'var(--color-brand-dark)' }}>
						<span className="font-bold">10:00 AM-10:45 AM</span> | 45 min
					</div>
				</div>
			</div>
			
			<div className="grid grid-cols-3 gap-3 text-xs mt-3">
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Estimated fare</span>
					</div>
					<div className="font-bold" style={{ color: 'var(--color-brand-dark)' }}>60-100 KES</div>
				</div>
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Pick Hours</span>
					</div>
					<div className="font-bold" style={{ color: 'var(--color-brand-dark)' }}>4:00 PM - 8:00 PM</div>
				</div>
				<div>
					<div className="flex items-center gap-1 mb-1">
						<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-accent)' }}></div>
						<span style={{ color: 'var(--color-brand-dark)' }}>Connections</span>
					</div>
					<div className="font-bold" style={{ color: 'var(--color-brand-dark)' }}>1</div>
				</div>
			</div>

			{/* Route Info */}
			<div className="mt-3 pt-3 border-t border-gray-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--color-brand-primary)' }}>
							<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>46H</span>
						</div>
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Huruma sacco</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xs" style={{ color: 'var(--color-brand-dark)' }}>Travel time</span>
						<span className="text-xs font-bold" style={{ color: 'var(--color-brand-dark)' }}>50 min</span>
					</div>
				</div>
				
				<div className="flex items-center justify-center gap-2 mt-2">
					<div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--color-brand-primary)' }}>
						<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>46H</span>
					</div>
					<svg className="w-3 h-3" style={{ color: 'var(--color-brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
					</svg>
					<div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'var(--color-brand-accent)' }}>
						<span className="text-xs font-bold" style={{ color: 'var(--color-brand-white)' }}>17AYK</span>
					</div>
					<svg className="w-3 h-3" style={{ color: 'var(--color-brand-primary)' }} fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
					</svg>
					<div className="w-3 h-3 rounded-full" style={{ background: 'var(--color-brand-primary)' }}></div>
				</div>
			</div>
		</div>
	);
}
