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
        Accept: "text/html,application/xhtml+xml",
      },
    });

    console.log(`fetch-poster: status=${res.status} url=${url}`);

    if (!res.ok) {
      console.log(`fetch-poster: non-ok response ${res.status}`);
      return NextResponse.json({ posterUrl: null });
    }

    const html = await res.text();

    // og:image can have attributes in either order
    const match =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/) ||
      html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/);

    const posterUrl = match ? match[1] : null;
    console.log(`fetch-poster: posterUrl=${posterUrl}`);

    return NextResponse.json({ posterUrl });
  } catch (err) {
    console.log(`fetch-poster: error`, err);
    return NextResponse.json({ posterUrl: null });
  }
}
