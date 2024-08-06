"use client";
import axios from "axios";
import SearchInput from "@/components/SearchInput";
import CourseList from "../_components/CourseList";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios("/api/courses/public", {
          params: {
            category: searchParams.get("category") || "",
          },
        });
        setCourses(res.data);
      } catch (error) {
        console.log(`something went wrong , ${error.message}`);
      }
    };
    fetchCourse();
  }, [searchParams]);

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>

      <div className="p-6">
        <CourseList courses={courses} />
      </div>
    </>
  );
};

export default Home;
