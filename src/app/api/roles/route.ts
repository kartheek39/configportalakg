// pages/api/data.ts
import { queryDatabase } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await queryDatabase("SELECT Name FROM [Config.Role]");
    return NextResponse.json(rows);
  } catch (err) {
    console.log(err);
    return NextResponse.json([]);
  }
}
