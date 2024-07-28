"use client";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UnpublishedBanner } from "@/components/Banner";
import { ConfirmModel } from "@/components/ConfirmModel";
import { LayoutDashboard, Loader2, Trash } from "lucide-react";

import axios from "axios";
import toast from "react-hot-toast";
import CourseForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/CourseForm";

const CourseIdPage = ({ params }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId && !courses) {
      router.push("/");
    }
  }, [userId, router, courses]);

  // Fetch Single Course Function

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const response = await axios(`/api/courses/${params.courseId}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchValues();
  }, [params.courseId]);

  // OnPublished Function

  const onPublished = async () => {
    setLoadingPublish(true);
    try {
      const currentPublishedState = courses.isPublished;
      const res = await axios.patch(`/api/courses/${params.courseId}`, {
        isPublished: !currentPublishedState,
      });

      setCourses(res.data);
      setLoadingPublish(false);

      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
      setLoadingPublish(false);
    }
  };

  // Handle Delete Course Function

  const handleDelete = async (courseId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Course Deleted");

      setLoading(false);
      router.push("/teacher/courses");
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  // Fields Required Logic

  const requiredFiled = [
    courses.title,
    courses.description,
    courses.category,
    courses.courseImage,
    courses.price,
  ];

  const totalFields = requiredFiled.length;
  const completedFields = requiredFiled.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requiredFiled.every(Boolean);

  return (
    <>
      {courses.isPublished ? null : <UnpublishedBanner />}

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
                <p>{courses.isPublished ? "Unpublish" : "Publish"}</p>
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
        <CourseForm values={courses} />
      </div>
    </>
  );
};

export default CourseIdPage;
