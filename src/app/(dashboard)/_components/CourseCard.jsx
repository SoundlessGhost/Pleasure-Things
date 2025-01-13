import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({
  id,
  title,
  courseImage,
  category,
  price,
  chaptersLength,
  isPublished,
  isFree,
}) => {
  return (
    <>
      {isPublished && (
        <Link href={`/courses/${id}`}>
          <div className="group hover:shadow-md transition rounded-lg p-3 border h-full overflow-hidden">
            <div className="aspect-video relative rounded-md w-full overflow-hidden">
              <Image
                fill
                alt={title}
                src={courseImage}
                className="object-cover"
              />
            </div>

            <div className="flex flex-col pt-2">
              <p className="text-lg font-medium line-clamp-1 md:text-base transition group-hover:text-sky-700">
                {title}
              </p>
              <p className="text-xs text-muted-foreground ">{category}</p>
            </div>

            <div className="flex items-center gap-x-2 text-slate-500 my-3">
              <BookOpen className="h-4 w-4 text-red-700" />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "chapter" : "chapters"}
              </span>
            </div>

            {/* TODO Progress Components */}

            <div>
              <p className=" text-slate-600 text-sm font-[800]">${price}</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default CourseCard;
