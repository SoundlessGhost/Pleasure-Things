"use client";
import axios from "axios";
import CourseList from "./_components/CourseList";
import SearchInput from "@/components/SearchInput";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchPage = () => {
  const [courses, setCourses] = useState([]);
  const [chapters, setChapters] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch Course Function

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/courses/public", {
          params: {
            category: searchParams.get("category") || "",
          },
        });
        setCourses(res.data);
      } catch {
        console.log("Something went wrong fetching courses");
      }
    };
    fetchCourses();
  }, [searchParams]);

  // Fetch Chapters Function

  useEffect(() => {
    const fetchChapters = async (courseId) => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/chapters`);
        setChapters((prevChapters) => ({
          ...prevChapters,
          [courseId]: res.data,
        }));
      } catch {
        console.log(
          `Something went wrong fetching chapters for course ${courseId}`
        );
      }
    };

    courses.forEach((course) => {
      if (!chapters[course._id]) {
        fetchChapters(course._id);
      }
    });
  }, [courses, chapters]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6">
        <CourseList courses={courses} chapters={chapters} />
      </div>
    </>
  );
};

export default SearchPage;
