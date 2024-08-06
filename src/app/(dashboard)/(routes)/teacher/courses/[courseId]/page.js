"use client";
import axios from "axios";
import toast from "react-hot-toast";
import CourseForm from "./_components/CourseForm";
import useSingleCourse from "@/hooks/useSingleCourse";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UnpublishedBanner } from "@/components/Banner";
import { ConfirmModel } from "@/components/ConfirmModel";
import { LayoutDashboard, Loader2, Trash } from "lucide-react";

const CourseIdPage = ({ params }) => {
  const { userId } = useAuth();
  const { course, refetch } = useSingleCourse(params.courseId);

  const [loading, setLoading] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!userId && !course) {
      router.push("/");
    }
  }, [userId, router, course]);

  // Course Published Function

  const onPublished = async () => {
    setLoadingPublish(true);
    try {
      const currentPublishedState = course.isPublished;
      await axios.patch(`/api/courses/${params.courseId}`, {
        isPublished: !currentPublishedState,
      });

      refetch();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoadingPublish(false);
    }
  };

  // Handle Delete Course Function

  const handleDelete = async (courseId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course Deleted");
      router.push("/teacher/courses");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fields Required Logic

  const requiredFiled = [
    course.title,
    course.description,
    course.category,
    course.courseImage,
    course.price,
  ];

  const totalFields = requiredFiled.length;
  const completedFields = requiredFiled.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requiredFiled.every(Boolean);

  return (
    <>
      {course.isPublished ? null : <UnpublishedBanner />}

      <div className="p-6 font">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Creation</h1>
            <p className=" text-muted-foreground text-xs">
              Provide your information & complete all fields {completionText}
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <Button
              onClick={onPublished}
              disabled={loadingPublish || !isCompleted}
            >
              {loadingPublish ? (
                <Loader2 className="animate-spin" />
              ) : (
                <p>{course.isPublished ? "Unpublish" : "Publish"}</p>
              )}
            </Button>
            <ConfirmModel onConfirm={() => handleDelete(params.courseId)}>
              <Button disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash className="h-4 w-4 " />
                )}
              </Button>
            </ConfirmModel>
          </div>
        </div>
        <div className="flex items-center mb-10 mt-16">
          <LayoutDashboard />
          <h2 className=" text-slate-600 text-2xl ml-2">
            Customize your course
          </h2>
        </div>
        <CourseForm values={course} />
      </div>
    </>
  );
};

export default CourseIdPage;
