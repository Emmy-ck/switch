import type { RouteMatch } from "@/lib/types";
import RouteCard from "./RouteCard";

type Props = {
	results: RouteMatch[];
};

export default function ResultsList({ results }: Props) {
	if (results.length === 0) {
		return <div className="text-sm text-gray-500">No routes found.</div>;
	}
	return (
		<div className="grid gap-3">
			{results.map((m) => (
				<RouteCard key={`${m.route.id}-${m.fromStopId}-${m.toStopId}`} match={m} />)
			)}
		</div>
	);
}


