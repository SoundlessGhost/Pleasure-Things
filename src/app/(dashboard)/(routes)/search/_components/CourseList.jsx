"use client";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseList = ({ courses, chapters }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 font">
        {courses.map((course, i) => (
          <>
            {course.isPublished && (
              <Link key={i} href={`/courses/${course._id}`}>
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
                    <p className="text-lg font-medium line-clamp-2 md:text-base transition group-hover:text-sky-700">
                      {course.title}
                    </p>
                    <p className="text-xs text-muted-foreground ">
                      {course.category}
                    </p>
                  </div>

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

                  {/* TODO Progress components */}

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
      {courses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10 font">
          No courses found
        </div>
      )}
    </div>
  );
};

export default CourseList;
