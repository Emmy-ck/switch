import { NextRequest } from "next/server";
import { routes } from "@/lib/data";
import type { ApiResponse, Route } from "@/lib/types";
import { searchRoutes } from "@/lib/search";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const from = searchParams.get("from");
	const to = searchParams.get("to");
	const fromId = searchParams.get("fromId");
	const toId = searchParams.get("toId");

	if (from || to || fromId || toId) {
		const matches = searchRoutes({ fromQuery: from ?? undefined, toQuery: to ?? undefined, fromStopId: fromId ?? undefined, toStopId: toId ?? undefined });
		return Response.json({ data: matches } satisfies ApiResponse<unknown>, { status: 200 });
	}

	const body: ApiResponse<Route[]> = { data: routes };
	return Response.json(body, { status: 200 });
}


