import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST endpoint to create a new Safe account
export async function POST(request: Request) {
  try {
    const { safeAddress, employerAddress, employeeAddress } = await request.json();

    // Validate input
    if (!safeAddress || !employerAddress || !employeeAddress) {
      return NextResponse.json({ error: "Safe address and owner address are required" }, { status: 400 });
    }

    // Create new Safe account
    const safeAccount = await prisma.safeAccount.create({
      data: {
        address: safeAddress,
        employerAddress: employerAddress,
        employeeAddress: employeeAddress,
      },
    });

    return NextResponse.json(safeAccount);
  } catch (error) {
    console.error("Failed to create safe account:", error);
    return NextResponse.json({ error: "Failed to create safe account" }, { status: 500 });
  }
}

// GET endpoint to fetch all Safe accounts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const employerAddress = searchParams.get("employerAddress");
    const employeeAddress = searchParams.get("employeeAddress");

    // Build query conditions based on provided query parameters
    const query: any = {};

    if (employerAddress) {
      query.employerAddress = employerAddress;
    }

    if (employeeAddress) {
      query.employeeAddress = employeeAddress;
    }

    const safeAccounts = await prisma.safeAccount.findMany({
      where: query,
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
