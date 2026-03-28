import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getEntries, addEntry, deleteEntry } from "@/lib/kv";
import type { WatchEntry } from "@/lib/types";

export async function GET() {
  const entries = await getEntries();
  return NextResponse.json(entries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const entry: WatchEntry = {
    ...body,
    id: uuidv4(),
    addedAt: new Date().toISOString(),
  };
  await addEntry(entry);
  return NextResponse.json(entry, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  await deleteEntry(id);
  return NextResponse.json({ ok: true });
}
