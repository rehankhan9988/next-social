import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const { data } = await axios.get("http://154.26.136.191:130/image/All");

  return NextResponse.json({ data });
}
