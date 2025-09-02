import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/exams`);

    if (!response.ok) {
      throw new Error("Failed to fetch exams");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
