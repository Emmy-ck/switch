'use client';

import Footer from '@/components/Footer';
import { routes } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function ResultsDemo() {
	const router = useRouter();

	// Mock route data matching the image
	const routeResults = [
		{
			id: '4601',
			number: '4601',
			from: 'Umoja/Umoja',
			to: 'Kencom',
			time: '50 min',
			fare: '35/60',
			location: 'Tuskys/Round House',
			estimatedTime: '10:00 AM - 6:00 PM',
			connections: 'Connections',
			travelTime: '50 min',
			pick: '1'
		},
		{
			id: '4602',
			number: '4601',
			from: 'Umoja/Umoja',
			to: 'Kencom',
			time: '50 min',
			fare: '35/60',
			location: 'Tuskys/Round House',
			estimatedTime: '4:00 PM - 8:00 PM',
			connections: 'Connections',
			travelTime: '50 min',
			pick: '1'
		},
		{
			id: '4603',
			number: '4601',
			from: 'Umoja/Umoja',
			to: 'Kencom',
			time: '50 min',
			fare: '35/60',
			location: 'Tuskys/Round House',
			estimatedTime: '60-100 KES',
			connections: 'Connections',
			travelTime: '50 min',
			pick: '1'
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
				<h1 className="text-lg font-medium">Available routes</h1>
			</div>

			{/* Route Cards */}
			<div className="flex-1 px-4 py-4 space-y-3 pb-20">
				{routeResults.map((route) => (
					<div key={route.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
						{/* Route Header */}
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-[#BF4209] rounded flex items-center justify-center">
									<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
									</svg>
								</div>
								<span className="text-sm font-medium text-gray-600">{route.from}</span>
							</div>
							<span className="text-sm text-gray-500">{route.fare}</span>
						</div>

						{/* Route Details */}
						<div className="space-y-2 text-sm">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 text-[#BF4209]">
									<svg fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
									</svg>
								</div>
								<span className="text-gray-600">Location</span>
								<span className="text-gray-800">{route.location}</span>
							</div>

							<div className="flex items-center gap-2">
								<div className="w-4 h-4 text-[#BF4209]">
									<svg fill="currentColor" viewBox="0 0 24 24">
										<path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
										<path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
									</svg>
								</div>
								<span className="text-gray-600">Travel time</span>
								<span className="text-gray-800">{route.travelTime}</span>
							</div>

							<div className="flex items-center gap-2">
								<div className="w-4 h-4 text-[#BF4209]">
									<svg fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
									</svg>
								</div>
								<span className="text-gray-600">Pick hours</span>
								<span className="text-gray-800">{route.estimatedTime}</span>
							</div>

							<div className="flex items-center gap-2">
								<div className="w-4 h-4 text-[#BF4209]">
									<svg fill="currentColor" viewBox="0 0 24 24">
										<path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L3.5 15.9z"/>
									</svg>
								</div>
								<span className="text-gray-600">{route.connections}</span>
							</div>
						</div>

						{/* Matatu Number Badge */}
						<div className="mt-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">Matatu sacco:</span>
								<span className="bg-[#BF4209] text-white px-2 py-1 rounded text-xs font-medium">{route.number}</span>
							</div>
							<div className="flex items-center gap-1">
								<span className="text-sm text-gray-600">Travel time</span>
								<span className="text-sm font-medium">{route.time}</span>
							</div>
						</div>

						{/* Route Path Indicators */}
						<div className="mt-3 flex items-center gap-2">
							<div className="flex items-center gap-1">
								<div className="w-2 h-2 bg-[#BF4209] rounded-full"></div>
								<span className="text-xs text-gray-600">{route.number}</span>
							</div>
							<div className="flex-1 h-px bg-gray-300 mx-2"></div>
							<div className="flex items-center gap-1">
								<span className="text-xs text-gray-600">12KYK</span>
								<div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
									<svg className="w-4 h-4 text-[#BF4209]" fill="currentColor" viewBox="0 0 24 24">
										<path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}
