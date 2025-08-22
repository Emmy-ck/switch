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
		<div className="min-h-screen bg-gray-50">
			<ResultsPage 
				routes={mockRouteMatches}
				searchQuery={{
					from: "CBD - National Archives",
					to: "Kawangware"
				}}
			/>
		</div>
	);
}
