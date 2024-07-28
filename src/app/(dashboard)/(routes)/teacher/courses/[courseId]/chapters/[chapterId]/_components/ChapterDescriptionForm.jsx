"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";
import Editor from "@/components/Editor";
import Preview from "@/components/Preview";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const ChapterDescriptionForm = ({ courseId, value, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CourseDescription, setCourseDescription] = useState(
    value?.description
  );

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Course Description Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        description: CourseDescription,
      });
      toast.success("Chapter Description Updated");

      setLoading(false);
      setIsEditing(false);

      value.description = CourseDescription;
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between mb-2">
        Chapter Description
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
      {isEditing && (
        <>
          <Editor
            value={CourseDescription}
            onChange={setCourseDescription}
            className="mt-2"
          />
          <Button
            onClick={handleSubmit}
            disabled={!CourseDescription || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      )}
      {!isEditing && (
        <div>
          {!value.description && (
            <p className="text-sm text-slate-600 italic">No description</p>
          )}
          {value.description && <Preview value={value.description} />}
        </div>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
