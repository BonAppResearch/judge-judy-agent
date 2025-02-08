import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

// POST endpoint to create a new Safe account
export async function POST(request: Request) {
  try {
    const { safeAddress, ownerAddress } = await request.json();

    // Validate input
    if (!safeAddress || !ownerAddress) {
      return NextResponse.json({ error: "Safe address and owner address are required" }, { status: 400 });
    }

    // Create new Safe account
    const safeAccount = await prisma.safeAccount.create({
      data: {
        address: safeAddress,
        ownerAddress: ownerAddress,
      },
    });

    return NextResponse.json(safeAccount);
  } catch (error) {
    console.error("Failed to create safe account:", error);
    return NextResponse.json({ error: "Failed to create safe account" }, { status: 500 });
  }
}

// GET endpoint to fetch all Safe accounts
export async function GET() {
  try {
    const safeAccounts = await prisma.safeAccount.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(safeAccounts);
  } catch (error) {
    console.error("Failed to fetch safe accounts:", error);
    return NextResponse.json({ error: "Failed to fetch safe accounts" }, { status: 500 });
  }
}
