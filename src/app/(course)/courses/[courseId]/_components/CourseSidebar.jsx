"use client";
import React from "react";
import Link from "next/link";
import CourseSideBarItems from "./CourseSidebarItems";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { BookOpen, Ellipsis } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CourseSidebar = ({ course, chapters }) => {
  console.log("course", course, "chapters", chapters);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm font">
      <div className="p-8 border-b">
        <h1 className="font-semibold">{course.title}</h1>
      </div>

      <div className="flex font-[800] items-center justify-center gap-x-2 text-slate-600 bg-gray-200 p-4">
        <BookOpen className="h-4 w-4  text-emerald-700" />
        <p className="text-sm">
          {chapters.length} {chapters.length === 1 ? "chapter" : "chapters"}
        </p>
      </div>

      {/* Render Course Sidebar Items */}

      <div>
        {chapters.map((chapter, i) => (
          <div key={i} className="flex flex-col w-full">
            {course.isPublished && (
              <CourseSideBarItems chapter={chapter} courseId={course.id} />
            )}
          </div>
        ))}
      </div>

      {/* Course Sidebar Footer */}

      <div className="mt-auto p-4">
        <div className="p-4 flex flex-col border rounded-md">
          <h2 className="font-[600] mb-2">Upgrade to Pro</h2>
          <p className="text-sm text-slate-500 mb-4">
            Unlock all courses, get access to source code, and more.
          </p>
          <Button>Upgrade</Button>
        </div>
      </div>

      <Separator />

      <div className="p-6 font text-xs text-slate-500 flex items-center justify-between">
        <h5>
          &copy; {new Date().getFullYear()} <span>Squad Ring ( LMS )</span>
        </h5>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/terms-condition`} target="_blank">
              <DropdownMenuItem className="font cursor-pointer text-xs">
                Privacy Policy
              </DropdownMenuItem>
            </Link>

            <Link href={`/terms-condition`} target="_blank">
              <DropdownMenuItem className="font cursor-pointer text-xs">
                Terms & Condition
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CourseSidebar;
