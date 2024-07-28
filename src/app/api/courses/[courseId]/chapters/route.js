import ConnectDB from "@/lib/ConnectDB";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Chapters } from "@/models/Chapter";

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

    const chapters = await Chapters.find({ courseId });
    if (!chapters) {
      return NextResponse.json(
        { message: "chapters not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(chapters, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch chapters" },
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

    const { title, description, videoUrl, isFree, isPublished } =
      await request.json();

    const courseOwner = await Courses.findOne({ _id: courseId });
    if (!courseOwner) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const NewCourseChapter = await Chapters.create({
      title,
      courseId,
      description,
      videoUrl,
      isFree,
      isPublished,
    });
    return NextResponse.json(NewCourseChapter, { status: 201 });
  } catch (error) {
    console.error("Error creating Course chapter:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created Course chapter" },
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

    const deleteChapter = await Chapters.deleteOne({ _id: courseId });
    if (!deleteChapter) {
      return NextResponse.json(
        { message: "chapter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteChapter, { status: 200 });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete chapter" },
      { status: 500 }
    );
  }
}
