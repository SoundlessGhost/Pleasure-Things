import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
  try {
    const { courseId, chapterId } = params;

    if (!courseId || !chapterId) {
      return NextResponse.json(
        { message: "Course ID or Chapter ID parameter is missing" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Validate course ownership
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to access this course" },
        { status: 403 }
      );
    }

    // Fetch the chapter
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
    });

    if (!chapter) {
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chapter:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching the chapter." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { courseId, chapterId } = params;

    if (!courseId || !chapterId) {
      return NextResponse.json(
        { message: "Course ID or Chapter ID parameter is missing" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to modify this course" },
        { status: 403 }
      );
    }

    const { title, description, videoUrl, isFree, isPublished } =
      await request.json();

    // Fetch and update the chapter
    const updatedChapter = await prisma.chapter.update({
      where: { id: chapterId },
      data: {
        title: title || undefined,
        description: description || undefined,
        videoUrl: videoUrl || undefined,
        isFree: isFree ?? undefined,
        isPublished: isPublished ?? undefined,
      },
    });

    return NextResponse.json(updatedChapter, { status: 200 });
  } catch (error) {
    console.error("Error updating chapter:", error);
    return NextResponse.json(
      { message: "Something went wrong while updating the chapter." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { chapterId } = params;
    if (!chapterId) {
      return NextResponse.json(
        { message: "Chapter ID parameter is missing" },
        { status: 400 }
      );
    }

    // Find the chapter and verify ownership
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { course: true },
    });

    if (!chapter) {
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 }
      );
    }

    if (chapter.course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized to delete this chapter" },
        { status: 403 }
      );
    }

    // Delete the chapter
    await prisma.chapter.delete({ where: { id: chapterId } });

    return NextResponse.json(
      { message: "Chapter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return NextResponse.json(
      { message: "Something went wrong while deleting the chapter." },
      { status: 500 }
    );
  }
}
