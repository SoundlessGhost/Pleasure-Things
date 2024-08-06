import ConnectDB from "@/lib/ConnectDB";
import { isTeacher } from "@/lib/Teacher";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    await ConnectDB();

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const courses = await Courses.find({ userId });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch titles" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await ConnectDB();

    const { userId } = auth();
    if (!userId || !isTeacher(userId)) {
      return NextResponse.json("unauthorized", { status: 401 });
    }

    const {
      title,
      description,
      courseImage,
      price,
      category,
      isPublished,
      isPurchase,
    } = await request.json();

    const NewCourse = await Courses.create({
      userId,
      title,
      description,
      courseImage,
      price,
      category,
      isPublished,
      isPurchase,
    });
    return NextResponse.json(NewCourse, { status: 201 });
  } catch (error) {
    console.error("Error creating Course :", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Created Course " },
      { status: 500 }
    );
  }
}
