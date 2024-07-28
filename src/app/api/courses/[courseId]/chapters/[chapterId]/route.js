import ConnectDB from "@/lib/ConnectDB";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { Chapters } from "@/models/Chapter";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { courseId, chapterId } = params;
    if (!courseId || !chapterId) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ownCourse = await Courses.findOne({ _id: courseId });
    if (!ownCourse) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const chapter = await Chapters.findOne({ _id: chapterId });

    return NextResponse.json(chapter, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chapter:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch chapter" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    await ConnectDB();

    const { courseId, chapterId } = params;
    if (!courseId || !chapterId) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ownCourse = await Courses.findOne({ _id: courseId });
    if (!ownCourse) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, videoUrl, isFree, isPublished } =
      await request.json();

    const chapter = await Chapters.findOne({ _id: chapterId });
    if (!chapter) {
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 404 }
      );
    }

    chapter.title = title ?? chapter.title;
    chapter.description = description ?? chapter.description;
    chapter.videoUrl = videoUrl ?? chapter.videoUrl;
    chapter.isFree = isFree ?? chapter.isFree;
    chapter.isPublished = isPublished ?? chapter.isPublished;

    const updatedChapter = await chapter.save();

    return NextResponse.json(updatedChapter, { status: 200 });
  } catch (error) {
    console.error("Error updating Course chapter:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to update Course chapter." },
      { status: 500 }
    );
  }
}
