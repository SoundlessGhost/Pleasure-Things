"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const TitleForm = ({ courseId, value, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CourseTitle, setCourseTitle] = useState(value.title);

  console.log(CourseTitle, "CourseTitle");

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Course Title Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        title: CourseTitle,
      });

      value.title = CourseTitle;
      setIsEditing(false);

      toast.success("Chapter Title Updated");
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between">
        Chapter Title
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing ? (
            <div className="flex items-center">
              <Pencil className="h-3 w-3 mr-1" />
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </Label>

      {isEditing ? (
        <>
          <Input
            onChange={(e) => setCourseTitle(e.target.value)}
            className="mt-2"
            placeholder="e.g Web Developer"
            defaultValue={value.title}
          />
          <Button
            onClick={handleSubmit}
            disabled={!CourseTitle || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      ) : (
        <p className="text-slate-600 text-sm">{value.title}</p>
      )}
    </div>
  );
};

export default TitleForm;
