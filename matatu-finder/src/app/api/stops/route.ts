import { NextRequest } from "next/server";
import { stops } from "@/lib/data";
import type { ApiResponse, Stop } from "@/lib/types";

export async function GET(_req: NextRequest) {
	const body: ApiResponse<Stop[]> = { data: stops };
	return Response.json(body, { status: 200 });
}


