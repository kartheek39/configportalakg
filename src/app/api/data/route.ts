// pages/api/data.ts

import { NextResponse } from "next/server";

//req is short for request
export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      name: "John Doe",
      email: "7M2YU@example.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "ZV2VW@example.com",
    },
  ]);
}
