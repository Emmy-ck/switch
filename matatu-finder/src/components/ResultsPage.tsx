import { useState } from 'react';
import type { RouteMatch, MultiLegRouteMatch } from '@/lib/types';
import RouteResult from './RouteResult';

type Props = {
	routes: RouteMatch[];
	multiLegRoutes?: MultiLegRouteMatch[];
	searchQuery?: {
		from: string;
		to: string;
	};
};

export default function ResultsPage({ routes, multiLegRoutes = [], searchQuery }: Props) {
	const [expandedRouteId, setExpandedRouteId] = useState<string | null>(
		routes.length > 0 ? routes[0].route.id : null
	);

	const handleToggleExpand = (routeId: string) => {
		setExpandedRouteId(expandedRouteId === routeId ? null : routeId);
	};

	const allRoutes = [...routes];
	
	// Add multi-leg routes as individual entries for display
	multiLegRoutes.forEach(multiLeg => {
		multiLeg.legs.forEach(leg => {
			allRoutes.push(leg);
		});
	});

	// Sort routes by estimated fare (cheapest first)
	const sortedRoutes = allRoutes.sort((a, b) => a.estimatedFare - b.estimatedFare);

	return (
		<div className="max-w-4xl mx-auto p-4">
			{/* Header */}
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Route Recommendations
				</h1>
				{searchQuery && (
					<p className="text-gray-600">
						From <span className="font-medium">{searchQuery.from}</span> to{' '}
						<span className="font-medium">{searchQuery.to}</span>
					</p>
				)}
				<div className="mt-2 text-sm text-gray-500">
					{sortedRoutes.length} route{sortedRoutes.length !== 1 ? 's' : ''} found
				</div>
			</div>

			{/* Results Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-blue-50 p-4 rounded-lg">
					<div className="text-sm text-blue-600 font-medium">Cheapest Route</div>
					<div className="text-xl font-bold text-blue-900">
						KES {Math.min(...sortedRoutes.map(r => r.estimatedFare))}
					</div>
					<div className="text-xs text-blue-600 mt-1">
						Route {sortedRoutes[0]?.route.number}
					</div>
				</div>
				
				<div className="bg-green-50 p-4 rounded-lg">
					<div className="text-sm text-green-600 font-medium">Fastest Route</div>
					<div className="text-xl font-bold text-green-900">
						{Math.min(...sortedRoutes.map(r => r.route.estimatedTime || 60))}m
					</div>
					<div className="text-xs text-green-600 mt-1">
						Route {sortedRoutes.find(r => 
							r.route.estimatedTime === Math.min(...sortedRoutes.map(rt => rt.route.estimatedTime || 60))
						)?.route.number}
					</div>
				</div>
				
				<div className="bg-purple-50 p-4 rounded-lg">
					<div className="text-sm text-purple-600 font-medium">Direct Routes</div>
					<div className="text-xl font-bold text-purple-900">
						{routes.length}
					</div>
					<div className="text-xs text-purple-600 mt-1">
						No transfers needed
					</div>
				</div>
			</div>

			{/* Route Results */}
			<div className="space-y-4">
				{sortedRoutes.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-gray-400 text-lg mb-2">No routes found</div>
						<div className="text-gray-500 text-sm">
							Try adjusting your search criteria or check for alternative stops nearby.
						</div>
					</div>
				) : (
					<>
						{/* Main/Recommended Route (First one, expanded by default) */}
						<div className="mb-6">
							<div className="flex items-center gap-2 mb-3">
								<div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
									RECOMMENDED
								</div>
								<div className="text-sm text-gray-600">Best overall option</div>
							</div>
							<RouteResult
								match={sortedRoutes[0]}
								isExpanded={expandedRouteId === sortedRoutes[0].route.id}
								onToggleExpand={() => handleToggleExpand(sortedRoutes[0].route.id)}
							/>
						</div>

						{/* Other Routes */}
						{sortedRoutes.length > 1 && (
							<div>
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Alternative Routes
								</h2>
								<div className="space-y-3">
									{sortedRoutes.slice(1).map((match, index) => (
										<RouteResult
											key={`${match.route.id}-${index}`}
											match={match}
											isExpanded={expandedRouteId === match.route.id}
											onToggleExpand={() => handleToggleExpand(match.route.id)}
										/>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* Multi-leg Routes Section */}
			{multiLegRoutes.length > 0 && (
				<div className="mt-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-4">
						Routes with Transfers
					</h2>
					<div className="space-y-4">
						{multiLegRoutes.map((multiLeg, index) => (
							<div key={index} className="border rounded-lg p-4 bg-orange-50">
								<div className="flex items-center justify-between mb-3">
									<div className="text-sm font-medium text-orange-800">
										{multiLeg.legs.length} Transfer{multiLeg.legs.length > 2 ? 's' : ''}
									</div>
									<div className="text-lg font-bold text-orange-900">
										KES {multiLeg.totalFare}
									</div>
								</div>
								<div className="space-y-2">
									{multiLeg.legs.map((leg, legIndex) => (
										<div key={legIndex} className="text-sm">
											<span className="font-medium">Leg {legIndex + 1}:</span>
											<span className="ml-2">Route {leg.route.number} - {leg.route.name}</span>
											<span className="ml-2 text-gray-600">(KES {leg.estimatedFare})</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Footer Info */}
			<div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
				<div className="font-medium mb-2">Important Notes:</div>
				<ul className="space-y-1 text-xs">
					<li>• Fares may vary during peak hours (7-9 AM, 5-7 PM)</li>
					<li>• Travel times are estimates and may vary due to traffic conditions</li>
					<li>• Always confirm route details with the conductor before boarding</li>
					<li>• Keep small change ready for fare payment</li>
				</ul>
			</div>
		</div>
	);
}
