'use client';

import Footer from '@/components/Footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ResultsPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showAlternatives, setShowAlternatives] = useState(false);

	const fromLocation = searchParams.get('from') || 'Umoja';
	const toLocation = searchParams.get('to') || 'CBD';

	// Recommended route (main result)
	const recommendedRoute = {
		id: 'main',
		routeNumber: '46',
		saccoName: 'Umoja Sacco',
		from: fromLocation,
		to: toLocation,
		boardingStage: 'Tuskys Umoja Stage',
		fare: 'KES 60',
		travelTime: '45-60 min',
		peakHours: '7:00 AM - 9:00 AM, 5:00 PM - 8:00 PM',
		frequency: 'Every 5-10 minutes',
		tips: [
			'Board early during peak hours (7-9 AM, 5-8 PM)',
			'Carry exact change when possible',
			'Alternative: Route 58 via Jogoo Road (longer but less crowded)'
		]
	};

	// Alternative routes
	const alternativeRoutes = [
		{
			id: 'alt1',
			routeNumber: '58',
			saccoName: 'Eastlands Sacco',
			from: fromLocation,
			to: toLocation,
			boardingStage: 'Jogoo Road Stage',
			fare: 'KES 50',
			travelTime: '60-75 min',
			peakHours: '7:00 AM - 9:00 AM, 5:00 PM - 8:00 PM',
			frequency: 'Every 8-15 minutes',
			tips: ['Less crowded than Route 46', 'Scenic route via Jogoo Road']
		},
		{
			id: 'alt2',
			routeNumber: '33',
			saccoName: 'City Hoppa',
			from: fromLocation,
			to: toLocation,
			boardingStage: 'Muthurwa Market',
			fare: 'KES 40',
			travelTime: '50-65 min',
			peakHours: '6:30 AM - 9:00 AM, 4:30 PM - 7:30 PM',
			frequency: 'Every 10-20 minutes',
			tips: ['Cheapest option', 'May require short walk to boarding stage']
		}
	];

	return (
		<div className="min-h-screen bg-white flex flex-col">
			{/* Header */}
			<div className="bg-[#BF4209] text-white px-4 py-4 flex items-center gap-3">
				<button 
					onClick={() => router.back()}
					className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<h1 className="text-lg font-medium">Route Results: {fromLocation} → {toLocation}</h1>
			</div>

			<div className="flex-1 px-4 py-4 space-y-4 pb-20">
				{/* Search Summary */}
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
					<h2 className="text-sm font-medium text-blue-800 mb-1">Route Found!</h2>
					<p className="text-xs text-blue-600">Best route from {fromLocation} to {toLocation}</p>
				</div>

				{/* Recommended Route */}
				<div className="bg-white border-2 border-green-200 rounded-lg p-4 shadow-sm">
					<div className="flex items-center gap-2 mb-3">
						<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
							<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
								<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-800">Recommended Route</h3>
					</div>

					{/* Route Details */}
					<div className="space-y-3">
						<div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
							<div>
								<div className="text-sm font-medium text-gray-700">Matatu Route</div>
								<div className="text-lg font-bold text-[#BF4209]">#{recommendedRoute.routeNumber}</div>
							</div>
							<div className="text-right">
								<div className="text-sm text-gray-600">Fare</div>
								<div className="text-lg font-bold text-green-600">{recommendedRoute.fare}</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-3">
							<div className="p-3 bg-orange-50 rounded-lg">
								<div className="flex items-center gap-2 mb-1">
									<svg className="w-4 h-4 text-[#BF4209]" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
									</svg>
									<span className="text-xs font-medium text-gray-600">Boarding Stage</span>
								</div>
								<div className="text-sm font-semibold text-gray-800">{recommendedRoute.boardingStage}</div>
							</div>
							<div className="p-3 bg-blue-50 rounded-lg">
								<div className="flex items-center gap-2 mb-1">
									<svg className="w-4 h-4 text-[#BF4209]" fill="currentColor" viewBox="0 0 24 24">
										<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
										<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
									</svg>
									<span className="text-xs font-medium text-gray-600">Travel Time</span>
								</div>
								<div className="text-sm font-semibold text-gray-800">{recommendedRoute.travelTime}</div>
							</div>
						</div>

						<div className="p-3 bg-yellow-50 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<svg className="w-4 h-4 text-[#BF4209]" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
								</svg>
								<span className="text-sm font-medium text-gray-700">Sacco: {recommendedRoute.saccoName}</span>
							</div>
							<div className="text-xs text-gray-600">Frequency: {recommendedRoute.frequency}</div>
						</div>

						{/* Tips Section */}
						<div className="p-3 bg-green-50 rounded-lg">
							<div className="flex items-center gap-2 mb-2">
								<svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
								</svg>
								<span className="text-sm font-medium text-green-800">Travel Tips</span>
							</div>
							<ul className="space-y-1">
								{recommendedRoute.tips.map((tip, index) => (
									<li key={index} className="text-xs text-green-700">• {tip}</li>
								))}
							</ul>
						</div>

						<div className="p-3 bg-gray-100 rounded-lg">
							<div className="text-xs text-gray-600 mb-1">Peak Hours</div>
							<div className="text-sm font-medium text-gray-800">{recommendedRoute.peakHours}</div>
						</div>
					</div>
				</div>

				{/* Alternative Routes Section */}
				<div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
					<button
						onClick={() => setShowAlternatives(!showAlternatives)}
						className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
					>
						<div className="flex items-center gap-2">
							<svg className="w-5 h-5 text-[#BF4209]" fill="currentColor" viewBox="0 0 24 24">
								<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
							</svg>
							<span className="text-lg font-semibold text-gray-800">Alternative Routes ({alternativeRoutes.length})</span>
						</div>
						<svg 
							className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
								showAlternatives ? 'rotate-180' : ''
							}`} 
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
						</svg>
					</button>

					{showAlternatives && (
						<div className="mt-4 space-y-3">
							{alternativeRoutes.map((route) => (
								<div key={route.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2">
											<div className="w-5 h-5 bg-[#BF4209] rounded-full flex items-center justify-center">
												<span className="text-xs text-white font-bold">{route.routeNumber}</span>
											</div>
											<span className="text-sm font-medium text-gray-700">{route.saccoName}</span>
										</div>
										<span className="text-sm font-semibold text-green-600">{route.fare}</span>
									</div>

									<div className="grid grid-cols-2 gap-2 text-xs">
										<div>
											<span className="text-gray-500">Boarding: </span>
											<span className="text-gray-700">{route.boardingStage}</span>
										</div>
										<div>
											<span className="text-gray-500">Time: </span>
											<span className="text-gray-700">{route.travelTime}</span>
										</div>
									</div>

									<div className="mt-2 text-xs">
										<span className="text-gray-500">Frequency: </span>
										<span className="text-gray-700">{route.frequency}</span>
									</div>

									{route.tips && route.tips.length > 0 && (
										<div className="mt-2">
											<div className="text-xs text-gray-500 mb-1">Tips:</div>
											{route.tips.map((tip, index) => (
												<div key={index} className="text-xs text-gray-600">• {tip}</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
}
