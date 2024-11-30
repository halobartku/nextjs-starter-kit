import { NextRequest, NextResponse } from "next/server";
import { validateVAT } from "@/utils/vies";

export async function POST(req: NextRequest) {
  try {
    const { vatNumber } = await req.json();

    if (!vatNumber) {
      return NextResponse.json(
        { error: "VAT number is required" },
        { status: 400 }
      );
    }

    const result = await validateVAT(vatNumber);

    return NextResponse.json(result);
  } catch (error) {
    console.error('VAT validation error:', error);
    return NextResponse.json(
      { error: "Failed to validate VAT number" },
      { status: 500 }
    );
  }
}