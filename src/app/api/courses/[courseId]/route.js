import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Bad Request: Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { message: "Not Found: Course not found for the given course" },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Bad Request: ID parameter is missing" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not matched" },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body) {
      return NextResponse.json(
        { message: "Bad Request: Body is missing" },
        { status: 400 }
      );
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseId },
      data: {
        title: body.title,
        price: body.price,
        category: body.category,
        courseImage: body.courseImage,
        description: body.description,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Bad Request: Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course || course.userId !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not matched" },
        { status: 401 }
      );
    }

    await prisma.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
