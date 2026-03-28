import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ posterUrl: null });
    }

    const html = await res.text();
    const match = html.match(/<meta property="og:image"\s+content="([^"]+)"/);
    const posterUrl = match ? match[1] : null;

    return NextResponse.json({ posterUrl });
  } catch {
    return NextResponse.json({ posterUrl: null });
  }
}
