"use client";

import { useMemo, useState } from "react";
import AutocompleteInput from "@/components/AutocompleteInput";
import ResultsList from "@/components/ResultsList";
import type { RouteMatch, Stop } from "@/lib/types";
import { searchRoutes } from "@/lib/search";

export default function HomeClient() {
	const [from, setFrom] = useState<Stop | null>(null);
	const [to, setTo] = useState<Stop | null>(null);

	const results: RouteMatch[] = useMemo(() => {
		if (!from || !to) return [];
		return searchRoutes({ fromStopId: from.id, toStopId: to.id });
	}, [from, to]);

	return (
		<div className="max-w-xl w-full mx-auto">
			<div className="grid gap-4">
				<AutocompleteInput label="From" placeholder="Enter origin stop" value={from} onChange={setFrom} />
				<AutocompleteInput label="To" placeholder="Enter destination stop" value={to} onChange={setTo} />
				<div className="mt-2">
					<ResultsList results={results} />
				</div>
			</div>
		</div>
	);
}


