import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getEntries, addEntry, updateEntry, deleteEntry } from "@/lib/kv";
import type { WatchEntry } from "@/lib/types";

export async function GET() {
  try {
    const entries = await getEntries();
    return NextResponse.json(entries);
  } catch (err) {
    console.error("GET /api/entries failed:", err);
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const entry: WatchEntry = {
      ...body,
      id: uuidv4(),
      addedAt: new Date().toISOString(),
    };
    await addEntry(entry);
    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    console.error("POST /api/entries failed:", err);
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const entry: WatchEntry = await request.json();
    await updateEntry(entry);
    return NextResponse.json(entry);
  } catch (err) {
    console.error("PUT /api/entries failed:", err);
    return NextResponse.json({ error: "Failed to update entry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteEntry(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/entries failed:", err);
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 });
  }
}
