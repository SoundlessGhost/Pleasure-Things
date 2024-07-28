import ConnectDB from "@/lib/ConnectDB";
import { Courses } from "@/models/Courses";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    const query = {
      ...(category && { category: { $regex: category, $options: "i" } }),
    };

    const courses = await Courses.find(query);

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { message: "Something Went Wrong Failed to Fetch courses" },
      { status: 500 }
    );
  }
}
