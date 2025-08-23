import type { RouteMatch } from "@/lib/types";

type Props = {
	match: RouteMatch;
};

export default function RouteCard({ match }: Props) {
	const { route, fromStopId, toStopId, stopsBetween, estimatedFare } = match;
	return (
		<div className="border rounded-md p-3 shadow-sm bg-white">
			<div className="flex items-center justify-between">
				<div className="text-sm font-semibold">Route {route.number}</div>
				<div className="text-sm text-gray-600">KES {estimatedFare}</div>
			</div>
			<div className="text-sm text-gray-700 mt-1">{route.name}</div>
			<div className="text-xs text-gray-500 mt-2">
				<span className="font-medium">From:</span> {fromStopId} → <span className="font-medium">To:</span> {toStopId}
			</div>
			{stopsBetween.length > 0 && (
				<div className="text-xs text-gray-500 mt-1">Via: {stopsBetween.join(" → ")}</div>
			)}
		</div>
	);
}


