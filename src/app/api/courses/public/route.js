import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request?.url);
    const category = searchParams.get("category") || "";

    // Build Prisma query based on category
    const query = category
      ? {
          where: {
            category: {
              contains: category,
              mode: "insensitive", // Case-insensitive search
            },
          },
          orderBy: {
            createdAt: "desc", // Optional: Sort by creation date
          },
        }
      : {
          orderBy: {
            createdAt: "desc",
          },
        };

    // Fetch courses based on query
    const courses = await prisma.course.findMany(query);

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching courses." },
      { status: 500 }
    );
  }
}
