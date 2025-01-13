"use client";
import axios from "axios";
import CourseCard from "./CourseCard";

import { useEffect, useState } from "react";

const CourseList = ({ courses }) => {
  const [chapters, setChapters] = useState({});

  useEffect(() => {
    const fetchChapters = async (courseId) => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/chapters`);
        setChapters((prevChapters) => ({
          ...prevChapters,
          [courseId]: res.data,
        }));
      } catch {
        console.error(`Error fetching chapters for course ${courseId}`);
      }
    };

    courses.forEach((course) => {
      if (!chapters[course.id]) {
        fetchChapters(course.id);
      }
    });
  }, [courses, chapters]);

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 font">
        {courses.map((course, i) => (
          <CourseCard
            key={i}
            id={course.id}
            price={course.price}
            title={course.title}
            isFree={course.isFree}
            category={course.category}
            isPublished={course.isPublished}
            courseImage={course.courseImage}
            chaptersLength={
              chapters[course.id] ? chapters[course.id].length : 0
            }
          />
        ))}
      </div>

      <div>
        {courses.length === 0 && (
          <div className="text-center text-sm text-muted-foreground mt-10 font">
            No courses found
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;