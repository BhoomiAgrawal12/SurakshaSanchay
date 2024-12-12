import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Category } from "@prisma/client"; // Import the Prisma Enum

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  // Validate category
  if (!category || !Object.values(Category).includes(category as Category)) {
    return NextResponse.json(
      { error: "Category is required and must be a valid enum value" },
      { status: 400 },
    );
  }

  try {
    // Query the database for all items in the given category
    const items = await db.inventoryItem.findMany({
      where: { category: category as Category },
      select: {
        // itemId: true,
        // description: true,
        quantity: true,
        location: true,
        // condition: true,
        // status: true,
      },
    });

    if (items.length === 0) {
      return NextResponse.json(
        { message: "No items found for the specified category" },
        { status: 404 },
      );
    }
    console.log(items);
    return NextResponse.json({ data: items }, { status: 200 });
  } catch (error) {
    console.error("Error fetching items by category:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching items" },
      { status: 500 },
    );
  }
}
