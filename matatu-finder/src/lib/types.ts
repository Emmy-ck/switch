export type Coordinates = {
	lat: number;
	lng: number;
};

export type Stop = {
	id: string;
	name: string;
	location: Coordinates;
	landmarks?: string[];
};

export type RouteSegment = {
	fromStopId: string;
	toStopId: string;
	distanceKm: number;
};

export type Route = {
	id: string;
	number: string; // e.g., "46A"
	name: string; // descriptive name
	stops: string[]; // ordered stop ids
	fare: {
		base: number; // typical off-peak fare in KES
		peak?: number; // peak fare in KES
	};
	segments?: RouteSegment[];
};

export type StopSearchResult = Stop & {
	distanceKm?: number;
};

export type RouteSearchParams = {
	fromQuery?: string;
	toQuery?: string;
	fromStopId?: string;
	toStopId?: string;
	maxHops?: number; // number of permitted changes
};

export type RouteMatch = {
	route: Route;
	fromStopId: string;
	toStopId: string;
	stopsBetween: string[];
	estimatedFare: number;
};

export type MultiLegRouteMatch = {
	legs: RouteMatch[];
	totalFare: number;
};

export type ApiResponse<T> = {
	data: T;
	message?: string;
	meta?: Record<string, unknown>;
};


