import { NextResponse } from "next/server";
import { contacts, graphEdges, organizations, topics } from "../../../lib/relora-data";
import { organizationSources } from "../../../lib/organization-sources";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      contacts,
      graphEdges,
      organizations,
      organizationSources,
      topics,
      source: "demo: dane przykładowe bez logowania",
      updatedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
