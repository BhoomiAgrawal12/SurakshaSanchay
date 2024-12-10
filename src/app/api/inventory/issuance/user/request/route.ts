import { IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const {
      userId,
      description,
      category,
      item,
      location,
      quantity,
      expectedDeliveryDate,
      purpose,
      expectedUsageDuration,
      approvalNeededBy,
      priorityLevel,
    } = body;

    const user = await prisma.user.findUnique({
      where: { govId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }
    console.log(location);
    const incharge = await prisma.user.findFirst({
      where: { AND: [{ location }, { role: "incharge" }] },
    });
    if (!incharge) {
      return NextResponse.json(
        { message: "Incharge not found!" },
        { status: 404 },
      );
    }
    console.log(incharge);
 

    const request = await prisma.issuanceRequest.create({
      data: {
        userId,
        name: item,
        category, 
        inchargeId: incharge?.govId || "",
        issueDescription: description,
        quantity,
        expectedDeliveryDate: new Date(expectedDeliveryDate),
        purpose,
        expectedUsageDuration,
        approvalNeededBy: new Date(approvalNeededBy),
        priorityLevel,
        isDamaged: false,
        status: "PENDING",
      },
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error: any) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 },
    );
  }
}
