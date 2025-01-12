import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// GET: Fetch attachment by courseId
export async function GET(request, { params }) {
  try {
    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Bad Request: Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const attachment = await prisma.attachment.findFirst({
      where: { courseId },
    });

    if (!attachment) {
      return NextResponse.json(
        { message: "Not Found: Attachment not found for the given course" },
        { status: 404 }
      );
    }

    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch attachment:", error);
    return NextResponse.json(
      { message: "Internal Server Error: Failed to fetch attachment" },
      { status: 500 }
    );
  }
}

// POST: Create a new attachment for the given courseId
export async function POST(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Bad Request: Course ID parameter is missing" },
        { status: 400 }
      );
    }

    const { attachment } = await request.json();

    const courseOwner = await prisma.course.findUnique({
      where: { id: courseId },
    });
    if (!courseOwner) {
      return NextResponse.json(
        { message: "Unauthorized: User is not the owner of the course" },
        { status: 401 }
      );
    }

    const newCourseAttachment = await prisma.attachment.create({
      data: {
        attachment,
        courseId,
      },
    });

    return NextResponse.json(newCourseAttachment, { status: 201 });
  } catch (error) {
    console.error("Error creating course attachment:", error);
    return NextResponse.json(
      { message: "Internal Server Error: Failed to create course attachment" },
      { status: 500 }
    );
  }
}

// DELETE: Delete attachment by attachment ID
export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    const { attachmentId } = params;
    if (!attachmentId) {
      return NextResponse.json(
        { message: "Bad Request: Attachment ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteAttachment = await prisma.attachment.delete({
      where: { id: attachmentId },
    });
    if (!deleteAttachment) {
      return NextResponse.json(
        { message: "Not Found: Attachment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteAttachment, { status: 200 });
  } catch (error) {
    console.error("Error deleting attachment:", error);
    return NextResponse.json(
      { message: "Internal Server Error: Failed to delete attachment" },
      { status: 500 }
    );
  }
}
