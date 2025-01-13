"use client";
import axios from "axios";
import useSingleCourse from "@/hooks/useSingleCourse";

import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CourseIdPage = ({ params }) => {
  const { courseId } = params;
  const { course } = useSingleCourse(courseId);
  const [chapters, setChapters] = useState([]);

  // Fetching chapters

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await axios(`/api/courses/${courseId}/chapters`);
        setChapters(res.data);
      } catch (error) {
        console.log("something wrong failed to fetch");
      }
    };
    fetchChapters();
  }, [courseId]);

  if (!course) {
    return redirect("/");
  }

  if (chapters.length === 0) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return redirect(`/courses/${courseId}/chapters/${chapters[0]?.id}`);
};

export default CourseIdPage;
