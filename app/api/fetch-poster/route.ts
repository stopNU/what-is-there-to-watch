import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imdbUrl = searchParams.get("imdbUrl");

  if (!imdbUrl) {
    return NextResponse.json({ error: "Missing imdbUrl" }, { status: 400 });
  }

  const match = imdbUrl.match(/title\/(tt\d+)/);
  if (!match) {
    return NextResponse.json({ posterUrl: null });
  }

  const imdbId = match[1];
  const apiKey = process.env.OMDB_API_KEY;

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`
    );
    const data = await res.json();
    const posterUrl = data.Poster && data.Poster !== "N/A" ? data.Poster : null;
    return NextResponse.json({ posterUrl });
  } catch (err) {
    console.error("fetch-poster error:", err);
    return NextResponse.json({ posterUrl: null });
  }
}
