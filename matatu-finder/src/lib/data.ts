import type { Coordinates, Route, Stop } from "./types";

export const nairobiCenter: Coordinates = { lat: -1.286389, lng: 36.817223 };

export const stops: Stop[] = [
	{ id: "CBD_Archives", name: "CBD - National Archives", location: { lat: -1.2841, lng: 36.8253 }, landmarks: ["National Archives", "Tom Mboya St"] },
	{ id: "Kencom", name: "Kencom House", location: { lat: -1.2860, lng: 36.8225 }, landmarks: ["Kencom", "City Hall Way"] },
	{ id: "Railways", name: "Railways Bus Station", location: { lat: -1.2921, lng: 36.8236 }, landmarks: ["Railways", "Haile Selassie Ave"] },
	{ id: "Nyayo", name: "Nyayo Stadium", location: { lat: -1.3080, lng: 36.8396 }, landmarks: ["Nyayo Stadium"] },
	{ id: "UpperHill", name: "Upper Hill", location: { lat: -1.3003, lng: 36.8120 }, landmarks: ["Afya Centre", "Hospital Rd"] },
	{ id: "Westlands", name: "Westlands", location: { lat: -1.2683, lng: 36.8110 }, landmarks: ["Westgate", "Mpaka Rd"] },
	{ id: "Kawangware", name: "Kawangware", location: { lat: -1.2850, lng: 36.7360 }, landmarks: ["Kawangware Stage"] },
	{ id: "Kikuyu", name: "Kikuyu", location: { lat: -1.2470, lng: 36.6650 }, landmarks: ["Kikuyu Town"] },
	{ id: "Langata", name: "Lang'ata", location: { lat: -1.3389, lng: 36.7768 }, landmarks: ["Wilson Airport", "Galleria"] },
	{ id: "Karen", name: "Karen", location: { lat: -1.3227, lng: 36.7205 }, landmarks: ["Karen Hub"] },
	{ id: "Embakasi", name: "Embakasi", location: { lat: -1.3300, lng: 36.9000 }, landmarks: ["Tassia", "Pipeline"] },
	{ id: "Donholm", name: "Donholm", location: { lat: -1.3000, lng: 36.9000 }, landmarks: ["Greenspan"] },
	{ id: "Buruburu", name: "Buruburu", location: { lat: -1.3000, lng: 36.8800 }, landmarks: ["Phase 1-5"] },
	{ id: "Ngong", name: "Ngong Town", location: { lat: -1.3527, lng: 36.6590 }, landmarks: ["Ngong Market"] },
];

export const routes: Route[] = [
	{
		id: "46A",
		number: "46A",
		name: "CBD → Kawangware",
		stops: ["CBD_Archives", "Kencom", "Westlands", "Kawangware"],
		fare: { base: 60, peak: 100 },
		sacco: "Kawangware Sacco",
		estimatedTime: 45,
	},
	{
		id: "111",
		number: "111",
		name: "CBD → Ngong",
		stops: ["Railways", "UpperHill", "Karen", "Ngong"],
		fare: { base: 80, peak: 130 },
		sacco: "Ngong Road Sacco",
		estimatedTime: 60,
	},
	{
		id: "15",
		number: "15",
		name: "CBD → Buruburu → Donholm",
		stops: ["Railways", "Buruburu", "Donholm"],
		fare: { base: 50, peak: 90 },
		sacco: "Eastlands Sacco",
		estimatedTime: 35,
	},
	{
		id: "34",
		number: "34",
		name: "CBD → Lang'ata → Karen",
		stops: ["Railways", "Langata", "Karen"],
		fare: { base: 70, peak: 120 },
		sacco: "South B Sacco",
		estimatedTime: 50,
	},
	{
		id: "105",
		number: "105",
		name: "CBD → Westlands → Kikuyu",
		stops: ["CBD_Archives", "Westlands", "Kikuyu"],
		fare: { base: 100, peak: 150 },
		sacco: "Kikuyu Sacco",
		estimatedTime: 75,
	},
];

export function getStopById(id: string) {
	return stops.find((s) => s.id === id);
}


