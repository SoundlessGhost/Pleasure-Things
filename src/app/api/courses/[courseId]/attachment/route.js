import ConnectDB from "@/lib/ConnectDB";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Attachment } from "@/models/Attachment";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const attachment = await Attachment.findOne({ courseId });
    if (!attachment) {
      return NextResponse.json(
        { message: "attachment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(attachment, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch attachment:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch attachment" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await ConnectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const { attachment } = await request.json();

    const courseOwner = await Courses.findOne({ _id: courseId });
    if (!courseOwner) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const NewCourseAttachment = await Attachment.create({
      attachment,
      courseId,
    });
    return NextResponse.json(NewCourseAttachment, { status: 201 });
  } catch (error) {
    console.error("Error creating Course attachment:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created Course attachment" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await ConnectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const deleteAttachment = await Attachment.deleteOne({ _id: courseId });
    if (!deleteAttachment) {
      return NextResponse.json(
        { message: "attachment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteAttachment, { status: 200 });
  } catch (error) {
    console.error("Error deleting attachment:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete attachment" },
      { status: 500 }
    );
  }
}
