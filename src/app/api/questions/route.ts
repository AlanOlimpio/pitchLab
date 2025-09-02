import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const examYear = searchParams.get("year");
  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "0";
  const language = searchParams.get("language");

  if (!examYear) {
    return NextResponse.json(
      { error: "Exam year is required" },
      { status: 400 }
    );
  }

  const langParam = language ? `&language=${language}` : "";

  try {
    const response = await fetch(
      `${process.env.API_URL}/exams/${examYear}/questions?limit=${limit}&offset=${offset}${langParam}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
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
