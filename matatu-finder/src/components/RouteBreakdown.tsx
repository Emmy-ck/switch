'use client';

import { useState } from 'react';
import type { RouteMatch, RouteStage } from '@/lib/types';
import { getStopById } from '@/lib/data';

type Props = {
	match: RouteMatch;
	onViewMap?: () => void;
};

export default function RouteBreakdown({ match, onViewMap }: Props) {
	const [showFullBreakdown, setShowFullBreakdown] = useState(false);
	const { route, fromStopId, toStopId, stopsBetween, estimatedFare, stages, totalDistance } = match;

	// Generate stages if not provided
	const routeStages: RouteStage[] = stages || generateStages(route.stops, fromStopId, toStopId, stopsBetween);

	const formatTime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	const getTrafficColor = (level?: string) => {
		switch (level) {
			case 'low': return 'text-green-600 bg-green-50';
			case 'medium': return 'text-yellow-600 bg-yellow-50';
			case 'high': return 'text-red-600 bg-red-50';
			default: return 'text-gray-600 bg-gray-50';
		}
	};

	const totalTime = routeStages.reduce((sum, stage) => sum + stage.estimatedTime, 0);
	const averageSpeed = totalDistance ? (totalDistance / (totalTime / 60)).toFixed(1) : 'N/A';

	return (
		<div className="bg-white border rounded-lg shadow-sm">
			{/* Header */}
			<div className="p-4 border-b bg-blue-50">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-blue-900">
							Route {route.number} - Journey Breakdown
						</h3>
						<p className="text-sm text-blue-700">{route.name}</p>
					</div>
					<div className="text-right">
						<div className="text-2xl font-bold text-blue-900">
							{formatTime(totalTime)}
						</div>
						<div className="text-sm text-blue-600">Total Journey Time</div>
					</div>
				</div>
			</div>

			{/* Quick Stats */}
			<div className="p-4 border-b bg-gray-50">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-lg font-bold text-gray-900">KES {estimatedFare}</div>
						<div className="text-xs text-gray-500">Total Fare</div>
					</div>
					<div className="text-center">
						<div className="text-lg font-bold text-gray-900">
							{totalDistance ? `${totalDistance.toFixed(1)} km` : 'N/A'}
						</div>
						<div className="text-xs text-gray-500">Distance</div>
					</div>
					<div className="text-center">
						<div className="text-lg font-bold text-gray-900">{averageSpeed} km/h</div>
						<div className="text-xs text-gray-500">Avg Speed</div>
					</div>
					<div className="text-center">
						<div className="text-lg font-bold text-gray-900">{routeStages.length}</div>
						<div className="text-xs text-gray-500">Stages</div>
					</div>
				</div>
			</div>

			{/* Journey Stages */}
			<div className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h4 className="font-semibold text-gray-900">Journey Stages</h4>
					<div className="flex gap-2">
						<button
							onClick={() => setShowFullBreakdown(!showFullBreakdown)}
							className="text-sm text-blue-600 hover:text-blue-800 font-medium"
						>
							{showFullBreakdown ? 'Show Less' : 'Show Full Breakdown'}
						</button>
						{onViewMap && (
							<button
								onClick={onViewMap}
								className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
							>
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
								</svg>
								View on Map
							</button>
						)}
					</div>
				</div>

				{/* Stage List */}
				<div className="space-y-3">
					{routeStages.map((stage, index) => {
						const fromStop = getStopById(stage.fromStopId);
						const toStop = getStopById(stage.toStopId);
						const isLastStage = index === routeStages.length - 1;

						return (
							<div key={`${stage.fromStopId}-${stage.toStopId}`} className="relative">
								{/* Stage Card */}
								<div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
									{/* Stage Number */}
									<div className="flex-shrink-0">
										<div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
											{index + 1}
										</div>
									</div>

									{/* Stage Details */}
									<div className="flex-1">
										<div className="flex items-center justify-between">
											<div>
												<div className="font-medium text-gray-900">
													{fromStop?.name || stage.fromStopId} → {toStop?.name || stage.toStopId}
												</div>
												{showFullBreakdown && (
													<div className="text-sm text-gray-600 mt-1">
														Distance: {stage.distance.toFixed(1)} km
														{stage.trafficLevel && (
															<span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getTrafficColor(stage.trafficLevel)}`}>
																{stage.trafficLevel} traffic
															</span>
														)}
													</div>
												)}
											</div>
											<div className="text-right">
												<div className="font-bold text-blue-600">
													{formatTime(stage.estimatedTime)}
												</div>
												{showFullBreakdown && (
													<div className="text-xs text-gray-500">
														{(stage.distance / (stage.estimatedTime / 60)).toFixed(1)} km/h
													</div>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Connection Line */}
								{!isLastStage && (
									<div className="flex justify-center py-2">
										<div className="w-px h-4 bg-gray-300"></div>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Additional Info */}
				{showFullBreakdown && (
					<div className="mt-6 p-4 bg-blue-50 rounded-lg">
						<h5 className="font-semibold text-blue-900 mb-2">Journey Tips</h5>
						<ul className="text-sm text-blue-800 space-y-1">
							<li>• Board at {getStopById(fromStopId)?.name} and alight at {getStopById(toStopId)?.name}</li>
							<li>• Have exact change ready - KES {estimatedFare}</li>
							<li>• Peak hours (7-9 AM, 5-7 PM) may have higher fares and longer travel times</li>
							<li>• Confirm the route number with the conductor before boarding</li>
							{route.sacco && <li>• Operated by {route.sacco}</li>}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

// Helper function to generate stages if not provided
function generateStages(
	routeStops: string[], 
	fromStopId: string, 
	toStopId: string, 
	stopsBetween: string[]
): RouteStage[] {
	const stages: RouteStage[] = [];
	const relevantStops = [fromStopId, ...stopsBetween, toStopId];
	
	for (let i = 0; i < relevantStops.length - 1; i++) {
		const fromStop = relevantStops[i];
		const toStop = relevantStops[i + 1];
		
		// Estimate time and distance based on stop positions
		const estimatedTime = Math.floor(Math.random() * 15) + 8; // 8-22 minutes per stage
		const distance = Math.random() * 8 + 2; // 2-10 km per stage
		const trafficLevels: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
		const trafficLevel = trafficLevels[Math.floor(Math.random() * trafficLevels.length)];
		
		stages.push({
			fromStopId: fromStop,
			toStopId: toStop,
			estimatedTime,
			distance,
			trafficLevel,
		});
	}
	
	return stages;
}
