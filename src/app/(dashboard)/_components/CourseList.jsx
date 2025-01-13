"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

const CourseList = ({ courses }) => {
  console.log("Information",courses);
  const [chapters, setChapters] = useState([]);

  // Fetching Chapters Length Function

  useEffect(() => {
    const fetchChapters = async (courseId) => {
      try {
        const res = await axios.get(`/api/courses/${courseId}/chapters`);
        setChapters((prevChapters) => ({
          ...prevChapters,
          [courseId]: res.data,
        }));
      } catch {
        console.log(`Something went wrong fetching chapters for course `);
      }
    };

    courses.forEach((course) => {
      if (!chapters[course._id]) {
        fetchChapters(course._id);
      }
    });
  }, [courses, chapters]);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 font">
        {courses.map((course, i) => (
          <>
            {/* Render Course Information When isPublished is True */}

            {course.isPublished && (
              <Link key={i} href={`/courses/${course.id}`}>
                <div className="group hover:shadow-md transition rounded-lg p-3 border h-full overflow-hidden">
                  <div className="aspect-video relative rounded-md w-full overflow-hidden">
                    <Image
                      fill
                      alt={course.title}
                      src={course.courseImage}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col pt-2">
                    <p className="text-lg font-medium line-clamp-1 md:text-base transition group-hover:text-sky-700">
                      {course.title}
                    </p>
                    <p className="text-xs text-muted-foreground ">
                      {course.category}
                    </p>
                  </div>

                  {/* Set Chapter length  */}

                  <div className="flex items-center gap-x-2 text-slate-500 my-3">
                    <BookOpen className="h-4 w-4 text-red-700" />
                    <p className="text-sm">
                      {chapters[course._id]
                        ? `${chapters[course._id].length} ${
                            chapters[course._id].length === 1
                              ? "chapter"
                              : "chapters"
                          }`
                        : "0 chapter"}
                    </p>
                  </div>

                  <div>
                    <p className=" text-slate-600 text-sm font-[800]">
                      ${course.price}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </>
        ))}
      </div>

      {/* When Course Not Available */}

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
