import React from "react";
import NavbarRoutes from "@/components/NavbarRoutes";
import MobileCourseNavbar from "./MobileCourseNavbar";

const CourseNavbar = ({ course, chapters }) => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm">
      <MobileCourseNavbar course={course} chapters={chapters}/>
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;
