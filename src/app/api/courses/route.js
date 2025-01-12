import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const courses = await prisma.course.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching courses." },
      { status: 500 }
    );
  }
}

async function isTeacher(userId) {
  // Replace with actual logic to check if the user is a teacher
  return true;
}

export async function POST(request) {
  try {
    const { userId } = auth();
    if (!userId || !(await isTeacher(userId))) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description = "",
      courseImage = "",
      price = 0,
      category = "",
      isPublished = false,
      isPurchase = false,
    } = await request.json();

    const newCourse = await prisma.course.create({
      data: {
        userId,
        title,
        description,
        courseImage,
        price,
        category,
        isPublished,
        isPurchase,
      },
    });

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { message: "Something went wrong while creating the course." },
      { status: 500 }
    );
  }
}
