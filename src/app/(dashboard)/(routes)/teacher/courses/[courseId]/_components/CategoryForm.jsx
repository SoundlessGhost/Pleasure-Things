"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const CategoryForm = ({ courseId, course }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseCategory, setCourseCategory] = useState(course.category);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Course Category Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}`, {
        category: courseCategory,
      });

      toast.success("Category Updated");
      setIsEditing(false); // Exit editing mode
      
      course.category = courseCategory; // Update the prop object locally
      router.refresh(); // Refresh the page to sync with the server data
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
        Course Category
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

      {/* Dropdown Select Content */}

      {isEditing ? (
        <>
          <Select onValueChange={(course) => setCourseCategory(course)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Digital Marketing">
                  Digital Marketing
                </SelectItem>
                <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                <SelectItem value="Content Writing and Copywriting">
                  Content Writing and Copywriting
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={handleSubmit}
            disabled={!courseCategory || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      ) : (
        <p className="text-slate-600 text-sm">{course.category}</p>
      )}
    </div>
  );
};

export default CategoryForm;
