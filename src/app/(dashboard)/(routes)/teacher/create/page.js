"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const [loading, setLoading] = useState(false);
  const [CourseTitle, setCourseTitle] = useState("");

  const router = useRouter();

  // Handle Create Course Function
  const handleCreateCourse = async () => {
    setLoading(true);

    const values = {
      title: CourseTitle,
      description: "",
      courseImage: "",
      price: 0,
      category: "",
      isPublished: false,
      isPurchase: false,
    };

    try {
      const res = await axios.post("/api/courses", values);

      router.push(`/teacher/courses/${res.data.id}`); // Redirect to the created course page
      toast.success("Course Created");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font max-w-5xl mx-auto p-6 md:mt-32 flex md:items-center md:justify-center">
      <div>
        <h1 className="text-3xl mb-2"> Name Of Your Course</h1>

        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>

        <form className="space-y-6 mt-8">
          <div>
            <Label className="font-[600]">Course Title</Label>
            <Input
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-2"
              placeholder="Advance web development"
            />
          </div>

          <div className="flex gap-x-2">
            <Link href={"/teacher/courses"}>
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button
              onClick={handleCreateCourse}
              disabled={!CourseTitle || loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
