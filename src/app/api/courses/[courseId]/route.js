import ConnectDB from "@/lib/ConnectDB";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

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

    const title = await Courses.findOne({ _id: courseId });
    if (!title) {
      return NextResponse.json({ message: "title not found" }, { status: 404 });
    }

    return NextResponse.json(title, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch title:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch title" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
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

    const { title, description, courseImage, price, category, isPublished } =
      await request.json();

    const user_course = await Courses.findOne({ _id: courseId });
    if (!user_course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    if (user_course.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    user_course.title = title ?? user_course.title;
    user_course.description = description ?? user_course.description;
    user_course.courseImage = courseImage ?? user_course.courseImage;
    user_course.price = price ?? user_course.price;
    user_course.category = category ?? user_course.category;
    user_course.isPublished = isPublished ?? user_course.isPublished;

    const updatedCourseTitle = await user_course.save();

    return NextResponse.json(updatedCourseTitle, { status: 200 });
  } catch (error) {
    console.error("Error updating Course Title:", error);
    return NextResponse.json(
      { message: "Something went wrong. Failed to update Course Title." },
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

    const deleteCourse = await Courses.deleteOne({ _id: courseId });
    if (!deleteCourse) {
      return NextResponse.json(
        { message: "course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteCourse, { status: 200 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to delete course" },
      { status: 500 }
    );
  }
}
