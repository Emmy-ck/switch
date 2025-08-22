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
	sacco?: string; // Sacco name
	estimatedTime?: number; // estimated travel time in minutes
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

export type RouteStage = {
	fromStopId: string;
	toStopId: string;
	estimatedTime: number; // minutes
	distance: number; // km
	trafficLevel?: 'low' | 'medium' | 'high';
};

export type RouteMatch = {
	route: Route;
	fromStopId: string;
	toStopId: string;
	stopsBetween: string[];
	estimatedFare: number;
	stages?: RouteStage[];
	totalDistance?: number;
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


