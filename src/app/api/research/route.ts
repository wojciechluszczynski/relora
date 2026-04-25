import { NextResponse } from "next/server";
import { runResearch } from "../../../lib/research-engine";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contactId = searchParams.get("contactId") ?? "cnt_tomasz-piotrowski";
  return NextResponse.json(runResearch(contactId));
}
