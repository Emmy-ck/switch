'use client';

import { useState } from 'react';
import type { RouteMatch } from '@/lib/types';
import { getStopById } from '@/lib/data';

type Props = {
	match: RouteMatch;
	onClose: () => void;
};

export default function RouteMapView({ match, onClose }: Props) {
	const { route, fromStopId, toStopId, stopsBetween } = match;
	const [mapLoaded, setMapLoaded] = useState(false);

	// Get all stops in the journey
	const journeyStops = [fromStopId, ...stopsBetween, toStopId];
	const stopDetails = journeyStops.map(stopId => getStopById(stopId)).filter(Boolean);

	// Calculate map center (average of all stop coordinates)
	const centerLat = stopDetails.reduce((sum, stop) => sum + (stop?.location.lat || 0), 0) / stopDetails.length;
	const centerLng = stopDetails.reduce((sum, stop) => sum + (stop?.location.lng || 0), 0) / stopDetails.length;

	// Mock Google Maps embed URL (in real implementation, you'd use Google Maps API)
	const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${stopDetails[0]?.location.lat},${stopDetails[0]?.location.lng}&destination=${stopDetails[stopDetails.length - 1]?.location.lat},${stopDetails[stopDetails.length - 1]?.location.lng}&waypoints=${stopDetails.slice(1, -1).map(stop => `${stop?.location.lat},${stop?.location.lng}`).join('|')}&mode=transit`;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b">
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							Route {route.number} - Map View
						</h2>
						<p className="text-sm text-gray-600">{route.name}</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-gray-100 rounded-full transition-colors"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Map Container */}
				<div className="flex-1 flex">
					{/* Map */}
					<div className="flex-1 relative">
						{/* Placeholder for actual map implementation */}
						<div className="w-full h-full bg-gray-100 flex items-center justify-center">
							<div className="text-center">
								<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
									</svg>
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
								<p className="text-gray-600 mb-4">
									Map integration would show the complete route with all stops and real-time traffic conditions.
								</p>
								<div className="text-sm text-gray-500">
									Center: {centerLat.toFixed(4)}, {centerLng.toFixed(4)}
								</div>
							</div>
						</div>

						{/* Map Controls Overlay */}
						<div className="absolute top-4 right-4 space-y-2">
							<button className="bg-white p-2 rounded shadow hover:bg-gray-50">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
							</button>
							<button className="bg-white p-2 rounded shadow hover:bg-gray-50">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
								</svg>
							</button>
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-80 border-l bg-gray-50 p-4 overflow-y-auto">
						<h3 className="font-semibold text-gray-900 mb-4">Route Details</h3>
						
						{/* Route Info */}
						<div className="bg-white p-3 rounded-lg mb-4">
							<div className="text-sm text-gray-600">Route</div>
							<div className="font-medium">{route.number} - {route.name}</div>
							{route.sacco && (
								<div className="text-sm text-gray-600 mt-1">Operated by {route.sacco}</div>
							)}
						</div>

						{/* Stops List */}
						<div className="space-y-2">
							<h4 className="font-medium text-gray-900">Journey Stops</h4>
							{stopDetails.map((stop, index) => {
								const isStart = index === 0;
								const isEnd = index === stopDetails.length - 1;
								const isActive = stop?.id === fromStopId || stop?.id === toStopId || stopsBetween.includes(stop?.id || '');

								return (
									<div key={stop?.id} className={`p-3 rounded-lg ${isActive ? 'bg-blue-50 border border-blue-200' : 'bg-white'}`}>
										<div className="flex items-center gap-3">
											<div className={`w-3 h-3 rounded-full ${
												isStart ? 'bg-green-500' : 
												isEnd ? 'bg-red-500' : 
												isActive ? 'bg-blue-500' : 'bg-gray-300'
											}`}></div>
											<div className="flex-1">
												<div className="font-medium text-sm">{stop?.name}</div>
												{stop?.landmarks && (
													<div className="text-xs text-gray-500">
														{stop.landmarks.join(', ')}
													</div>
												)}
											</div>
											{isStart && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Start</span>}
											{isEnd && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">End</span>}
										</div>
									</div>
								);
							})}
						</div>

						{/* Map Legend */}
						<div className="mt-6 p-3 bg-white rounded-lg">
							<h4 className="font-medium text-gray-900 mb-2">Legend</h4>
							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
									<span>Starting Point</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									<span>Route Stops</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-red-500 rounded-full"></div>
									<span>Destination</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-1 bg-blue-600 rounded"></div>
									<span>Route Path</span>
								</div>
							</div>
						</div>

						{/* Actions */}
						<div className="mt-4 space-y-2">
							<button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
								Get Directions
							</button>
							<button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
								Share Route
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
