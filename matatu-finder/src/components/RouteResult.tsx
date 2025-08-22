import { useState } from "react";
import type { RouteMatch } from "@/lib/types";
import { getStopById } from "@/lib/data";
import RouteBreakdown from "./RouteBreakdown";
import RouteMapView from "./RouteMapView";

type Props = {
	match: RouteMatch;
	isExpanded?: boolean;
	onToggleExpand?: () => void;
	showDetailedBreakdown?: boolean;
};

export default function RouteResult({ match, isExpanded = false, onToggleExpand, showDetailedBreakdown = false }: Props) {
	const [showMapView, setShowMapView] = useState(false);
	const [showBreakdown, setShowBreakdown] = useState(false);
	const { route, fromStopId, toStopId, stopsBetween, estimatedFare } = match;
	const fromStop = getStopById(fromStopId);
	const toStop = getStopById(toStopId);

	const formatTime = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
	};

	return (
		<div 
			className={`border rounded-lg shadow-sm bg-white transition-all duration-200 cursor-pointer hover:shadow-md ${
				isExpanded ? 'ring-2 ring-blue-500 shadow-lg' : ''
			}`}
			onClick={onToggleExpand}
		>
			{/* Main Route Header */}
			<div className="p-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-3">
						<div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
							{route.number}
						</div>
						<div className="text-lg font-semibold text-gray-900">
							{route.name}
						</div>
					</div>
					<div className="text-right">
						<div className="text-xl font-bold text-green-600">
							KES {estimatedFare}
						</div>
						{route.estimatedTime && (
							<div className="text-sm text-gray-500">
								{formatTime(route.estimatedTime)}
							</div>
						)}
					</div>
				</div>

				{/* Key Details Row */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
					<div className="text-center">
						<div className="text-xs text-gray-500 uppercase tracking-wide">From</div>
						<div className="text-sm font-medium text-gray-900 truncate">
							{fromStop?.name || fromStopId}
						</div>
					</div>
					<div className="text-center">
						<div className="text-xs text-gray-500 uppercase tracking-wide">To</div>
						<div className="text-sm font-medium text-gray-900 truncate">
							{toStop?.name || toStopId}
						</div>
					</div>
					<div className="text-center">
						<div className="text-xs text-gray-500 uppercase tracking-wide">Sacco</div>
						<div className="text-sm font-medium text-gray-900 truncate">
							{route.sacco || 'N/A'}
						</div>
					</div>
					<div className="text-center">
						<div className="text-xs text-gray-500 uppercase tracking-wide">Time</div>
						<div className="text-sm font-medium text-gray-900">
							{route.estimatedTime ? formatTime(route.estimatedTime) : 'N/A'}
						</div>
					</div>
				</div>
			</div>

			{/* Expanded Details */}
			{isExpanded && (
				<div className="border-t bg-gray-50 p-4">
					{/* Action Buttons */}
					<div className="flex gap-2 mb-4">
						<button
							onClick={() => setShowBreakdown(!showBreakdown)}
							className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							{showBreakdown ? 'Hide' : 'Show'} Journey Breakdown
						</button>
						<button
							onClick={() => setShowMapView(true)}
							className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
							</svg>
							View on Map
						</button>
					</div>

					{/* Journey Breakdown */}
					{showBreakdown && (
						<div className="mb-4">
							<RouteBreakdown 
								match={match} 
								onViewMap={() => setShowMapView(true)}
							/>
						</div>
					)}

					<div className="space-y-4">
						{/* Route Path */}
						<div>
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Route Path</h4>
							<div className="flex items-center gap-2 flex-wrap">
								{route.stops.map((stopId, index) => {
									const stop = getStopById(stopId);
									const isCurrentSegment = stopId === fromStopId || stopId === toStopId || stopsBetween.includes(stopId);
									
									return (
										<div key={stopId} className="flex items-center">
											<div className={`px-2 py-1 rounded text-xs ${
												isCurrentSegment 
													? 'bg-blue-100 text-blue-800 font-medium' 
													: 'bg-gray-100 text-gray-600'
											}`}>
												{stop?.name || stopId}
											</div>
											{index < route.stops.length - 1 && (
												<div className="mx-1 text-gray-400">→</div>
											)}
										</div>
									);
								})}
							</div>
						</div>

						{/* Fare Information */}
						<div>
							<h4 className="text-sm font-semibold text-gray-700 mb-2">Fare Information</h4>
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-white p-3 rounded border">
									<div className="text-xs text-gray-500">Off-Peak</div>
									<div className="text-lg font-bold text-green-600">KES {route.fare.base}</div>
								</div>
								{route.fare.peak && (
									<div className="bg-white p-3 rounded border">
										<div className="text-xs text-gray-500">Peak Hours</div>
										<div className="text-lg font-bold text-orange-600">KES {route.fare.peak}</div>
									</div>
								)}
							</div>
						</div>

						{/* Additional Info */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
							<div>
								<span className="font-medium text-gray-700">Sacco:</span>
								<span className="ml-2 text-gray-600">{route.sacco || 'Not specified'}</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">Estimated Time:</span>
								<span className="ml-2 text-gray-600">
									{route.estimatedTime ? formatTime(route.estimatedTime) : 'Not specified'}
								</span>
							</div>
						</div>

						{/* Landmarks */}
						{(fromStop?.landmarks || toStop?.landmarks) && (
							<div>
								<h4 className="text-sm font-semibold text-gray-700 mb-2">Nearby Landmarks</h4>
								<div className="space-y-1">
									{fromStop?.landmarks && (
										<div className="text-xs">
											<span className="font-medium">From {fromStop.name}:</span>
											<span className="ml-2 text-gray-600">{fromStop.landmarks.join(', ')}</span>
										</div>
									)}
									{toStop?.landmarks && (
										<div className="text-xs">
											<span className="font-medium">To {toStop.name}:</span>
											<span className="ml-2 text-gray-600">{toStop.landmarks.join(', ')}</span>
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Expand/Collapse Indicator */}
			<div className="px-4 py-2 border-t bg-gray-50 text-center">
				<div className="text-xs text-gray-500">
					{isExpanded ? 'Click to collapse' : 'Click to view details'}
				</div>
			</div>

			{/* Map View Modal */}
			{showMapView && (
				<RouteMapView 
					match={match} 
					onClose={() => setShowMapView(false)}
				/>
			)}
		</div>
	);
}
