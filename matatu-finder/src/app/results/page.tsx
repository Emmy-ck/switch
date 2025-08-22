'use client';

import { useState } from 'react';
import { ResultsPage } from '@/components';
import { routes } from '@/lib/data';
import type { RouteMatch } from '@/lib/types';

// Mock search results for demonstration with enhanced route data
const mockRouteMatches: RouteMatch[] = [
	{
		route: routes[0], // 46A CBD → Kawangware
		fromStopId: "CBD_Archives",
		toStopId: "Kawangware",
		stopsBetween: ["Kencom", "Westlands"],
		estimatedFare: 60,
		totalDistance: 18.5,
		stages: [
			{
				fromStopId: "CBD_Archives",
				toStopId: "Kencom",
				estimatedTime: 8,
				distance: 2.1,
				trafficLevel: 'medium'
			},
			{
				fromStopId: "Kencom",
				toStopId: "Westlands",
				estimatedTime: 15,
				distance: 6.8,
				trafficLevel: 'high'
			},
			{
				fromStopId: "Westlands",
				toStopId: "Kawangware",
				estimatedTime: 22,
				distance: 9.6,
				trafficLevel: 'low'
			}
		]
	},
	{
		route: routes[4], // 105 CBD → Westlands → Kikuyu
		fromStopId: "CBD_Archives",
		toStopId: "Westlands",
		stopsBetween: [],
		estimatedFare: 50,
		totalDistance: 8.9,
		stages: [
			{
				fromStopId: "CBD_Archives",
				toStopId: "Westlands",
				estimatedTime: 25,
				distance: 8.9,
				trafficLevel: 'medium'
			}
		]
	},
	{
		route: routes[1], // 111 CBD → Ngong
		fromStopId: "Railways",
		toStopId: "Karen",
		stopsBetween: ["UpperHill"],
		estimatedFare: 80,
		totalDistance: 15.2,
		stages: [
			{
				fromStopId: "Railways",
				toStopId: "UpperHill",
				estimatedTime: 12,
				distance: 4.3,
				trafficLevel: 'high'
			},
			{
				fromStopId: "UpperHill",
				toStopId: "Karen",
				estimatedTime: 28,
				distance: 10.9,
				trafficLevel: 'low'
			}
		]
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
