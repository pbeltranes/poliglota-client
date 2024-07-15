import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const project = process.env.PROJECT_NAME;
  const res = await fetch(`${process.env.API_URL}/config/${project}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return NextResponse.json(await res.json());
}
