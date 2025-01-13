"use client";
import axios from "axios";
import toast from "react-hot-toast";
import CourseForm from "./_components/CourseForm";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UnpublishedBanner } from "@/components/Banner";
import { ConfirmModel } from "@/components/ConfirmModel";
import { Loader2 } from "lucide-react";

const CourseIdPage = ({ params }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  const router = useRouter();

  // Fetch course details
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/courses/${params.courseId}`);
        setCourse(res.data);
      } catch (error) {
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [params.courseId, router]);

  if (loading) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  } // Loading Course Data

  if (!course) {
    return (
      <div className="w-full mt-10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const handlePublish = async () => {
    setLoadingPublish(true);
    try {
      await axios.patch(`/api/courses/${params.courseId}`, {
        isPublished: !course.isPublished,
      });
      setCourse((prev) => ({ ...prev, isPublished: !prev.isPublished }));
      toast.success(
        course.isPublished
          ? "Course unpublished successfully"
          : "Course published successfully"
      );
    } catch {
      toast.error("Failed to update publish state");
    } finally {
      setLoadingPublish(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${params.courseId}`);
      toast.success("Course deleted successfully");
      router.push("/teacher/courses");
    } catch {
      toast.error("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const requiredFields = [
    course.title,
    course.description,
    course.category,
    course.courseImage,
    course.price,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const isCompleted = completedFields === totalFields;

  return (
    <>
      {!course.isPublished && <UnpublishedBanner />}
      <div className="p-6 font">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-medium">Course Creation</h1>
            <p className="text-muted-foreground text-xs">
              Complete all fields ({completedFields}/{totalFields})
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={handlePublish}
              disabled={loadingPublish || !isCompleted}
            >
              {loadingPublish
                ? "Loading..."
                : course.isPublished
                ? "Unpublish"
                : "Publish"}
            </Button>
            <ConfirmModel onConfirm={handleDelete}>
              <Button disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </ConfirmModel>
          </div>
        </div>
        <CourseForm course={course} />
      </div>
    </>
  );
};

export default CourseIdPage;
