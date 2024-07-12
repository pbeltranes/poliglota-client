import { NextResponse } from "next/server";

export async function GET() {
  const project = process.env.PROJECT_NAME;
  console.log(`${process.env.API_URL}/config/${project}`);
  const res = await fetch(`${process.env.API_URL}/config/${project}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  return NextResponse.json(await res.json());
}
