import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // 'a', 'b', or 'c'

  console.log(slug);
  const project = process.env.PROJECT_NAME;
  const path = slug[0];
  const lang = slug[1];
  const locale = slug[2];

  const res = await fetch(
    `${process.env.API_URL}/translate/${project}/${path}/${lang}/${locale}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  //   if (!res.ok) {
  //     throw new Error(`Error: ${res.status}`);
  //   }
  return NextResponse.json(await res.json());
}
