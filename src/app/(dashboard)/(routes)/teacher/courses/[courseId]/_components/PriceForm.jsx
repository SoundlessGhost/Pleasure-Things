"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const PriceForm = ({ courseId, course }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [CoursePrice, setCoursePrice] = useState(course.price);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Price Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}`, {
        price: CoursePrice,
      });

      toast.success("Price Updated");
      setIsEditing(false); // Exit editing mode
      
      course.price = CoursePrice; // Update the prop object locally
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
        Course Price
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
            type="number"
            onChange={(e) => setCoursePrice(e.target.value)}
            className="mt-2"
            placeholder="e.g Money"
            defaultValue={course.price}
          />
          <Button
            onClick={handleSubmit}
            disabled={!CoursePrice || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      ) : (
        <p className="text-slate-600 text-sm">${course.price}</p>
      )}
    </div>
  );
};

export default PriceForm;
