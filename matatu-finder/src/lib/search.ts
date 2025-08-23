import type {
	Coordinates,
	Route,
	RouteMatch,
	RouteSearchParams,
	Stop,
	StopSearchResult,
} from "./types";
import { routes, stops, getStopById } from "./data";

export function toRadians(deg: number) {
	return (deg * Math.PI) / 180;
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
	const R = 6371; // Earth radius in km
	const dLat = toRadians(b.lat - a.lat);
	const dLng = toRadians(b.lng - a.lng);
	const lat1 = toRadians(a.lat);
	const lat2 = toRadians(b.lat);
	const sinDLat = Math.sin(dLat / 2);
	const sinDLng = Math.sin(dLng / 2);
	const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
	const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
	return R * c;
}

export function searchStops(query: string, limit = 8): StopSearchResult[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return stops
		.map((s) => ({
			...s,
			score:
				s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
					? 0
					: 1,
		}))
		.sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
		.slice(0, limit)
		.map(({ score, ...rest }) => rest);
}

function findRoutesCoveringStops(fromStopId: string, toStopId: string): RouteMatch[] {
	const matches: RouteMatch[] = [];
	routes.forEach((route: Route) => {
		const fromIndex = route.stops.indexOf(fromStopId);
		const toIndex = route.stops.indexOf(toStopId);
		if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
			const stopsBetween = route.stops.slice(fromIndex + 1, toIndex);
			matches.push({
				route,
				fromStopId,
				toStopId,
				stopsBetween,
				estimatedFare: route.fare.base,
			});
		}
	});
	return matches;
}

export function searchRoutes(params: RouteSearchParams): RouteMatch[] {
	const { fromQuery, toQuery, fromStopId, toStopId } = params;
	let from = fromStopId ? getStopById(fromStopId) : undefined;
	let to = toStopId ? getStopById(toStopId) : undefined;

	if (!from && fromQuery) {
		from = searchStops(fromQuery, 1)[0];
	}
	if (!to && toQuery) {
		to = searchStops(toQuery, 1)[0];
	}

	if (!from || !to) return [];
	return findRoutesCoveringStops(from.id, to.id);
}

export type NearbyStopOptions = {
	location: Coordinates;
	radiusKm?: number;
	limit?: number;
};

export function findNearbyStops(options: NearbyStopOptions): StopSearchResult[] {
	const { location, radiusKm = 2, limit = 10 } = options;
	return stops
		.map((s: Stop) => ({ ...s, distanceKm: haversineDistanceKm(location, s.location) }))
		.filter((s) => s.distanceKm !== undefined && s.distanceKm <= radiusKm)
		.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
		.slice(0, limit);
}


