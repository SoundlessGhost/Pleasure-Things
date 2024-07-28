"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import CourseSidebar from "./_components/CourseSidebar";

const CourseLayout = ({ children }) => {
  const { userId } = useAuth();

  if (!userId) {
    return redirect("/sign-up");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col w-80 h-full fixed inset-y-0 z-50">
        <CourseSidebar />
      </div>
      <main className="md:pl-80 h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;
