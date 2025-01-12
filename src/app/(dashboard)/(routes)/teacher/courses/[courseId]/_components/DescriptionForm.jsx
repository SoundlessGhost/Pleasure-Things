"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const DescriptionForm = ({ courseId, course }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CourseDescription, setCourseDescription] = useState(course.description);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Course Description Function

 const handleSubmit = async () => {
   setLoading(true);
   try {
     console.log("Submitting update request...", courseId);
     const response = await axios.patch(`/api/courses/${courseId}`, {
       description: CourseDescription,
     });
     console.log("Update response:", response.data);

     toast.success("Description Updated");
     router.refresh();
   } catch (error) {
     console.error("Error in handleSubmit:", error);
     toast.error("Something Went Wrong");
   } finally {
     setLoading(false);
   }
 };


  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between">
        Description
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
          <Textarea
            onChange={(e) => setCourseDescription(e.target.value)}
            className="mt-2"
            placeholder="e.g please provide your description"
            defaultValue={course.description}
          />
          <Button
            onClick={handleSubmit}
            disabled={!CourseDescription || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      ) : (
        <p className="text-slate-600 text-sm">{course.description}</p>
      )}
    </div>
  );
};

export default DescriptionForm;
