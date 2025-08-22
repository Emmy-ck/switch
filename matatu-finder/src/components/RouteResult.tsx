import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RouteMatch } from "@/lib/types";
import { getStopById } from "@/lib/data";

type Props = {
	match: RouteMatch;
	isExpanded?: boolean;
	onToggleExpand?: () => void;
};

export default function RouteResult({ match, isExpanded = false, onToggleExpand }: Props) {
	const router = useRouter();
	const { route, fromStopId, toStopId, stopsBetween, estimatedFare } = match;
	const fromStop = getStopById(fromStopId);
	const toStop = getStopById(toStopId);

	const handleViewDetails = (e: React.MouseEvent) => {
		e.stopPropagation();
		router.push(`/route/${route.id}`);
	};

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

			{/* Action Buttons */}
			<div className="px-4 py-2 border-t bg-gray-50 flex justify-between items-center">
				<div className="text-xs text-gray-500">
					{isExpanded ? 'Click to collapse' : 'Click to view details'}
				</div>
				<button
					onClick={handleViewDetails}
					className="bg-[var(--color-brand-primary)] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[var(--color-brand-accent)] transition-colors"
				>
					View Route
				</button>
			</div>
		</div>
	);
}
