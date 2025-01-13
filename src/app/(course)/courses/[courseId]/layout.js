"use client";

import useAllChapters from "@/hooks/useAllChapters";
import useSingleCourse from "@/hooks/useSingleCourse";
import CourseNavbar from "./_components/CourseNavbar";
import CourseSidebar from "./_components/CourseSidebar";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const CourseLayout = ({ children, params }) => {
  const { userId } = useAuth();
  const { course, isLoading } = useSingleCourse(params.courseId);
  const { chapters } = useAllChapters(params.courseId);

  if (!userId) {
    return redirect("/sign-in");
  }

  if (isLoading) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="h-[80px] w-full md:pl-80 fixed inset-y-0 z-50">
        <CourseNavbar course={course} chapters={chapters} />
      </div>

      <div className="hidden md:flex flex-col w-80 h-full fixed inset-y-0 z-50">
        <CourseSidebar course={course} chapters={chapters} />
      </div>

      <main className="md:pl-80 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default CourseLayout;
