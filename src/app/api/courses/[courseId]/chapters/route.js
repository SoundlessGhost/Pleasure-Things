import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const chapters = await prisma.chapter.findMany({
      where: { courseId },
      orderBy: { createdAt: "asc" },
    });

    if (!chapters || chapters.length === 0) {
      return NextResponse.json(
        { message: "No chapters found for the given course ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(chapters, { status: 200 });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching chapters." },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const { title, description, videoUrl, isFree, isPublished } =
      await request.json();

    // Check if the user owns the course
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to add chapters to this course" },
        { status: 403 }
      );
    }

    const newChapter = await prisma.chapter.create({
      data: {
        title,
        description,
        videoUrl,
        isFree: isFree || false,
        isPublished: isPublished || false,
        courseId,
      },
    });

    return NextResponse.json(newChapter, { status: 201 });
  } catch (error) {
    console.error("Error creating chapter:", error);
    return NextResponse.json(
      { message: "Something went wrong while creating the chapter." },
      { status: 500 }
    );
  }
}

