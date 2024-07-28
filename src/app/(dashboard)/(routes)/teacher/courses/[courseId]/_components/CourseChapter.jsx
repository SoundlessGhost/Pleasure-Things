"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConfirmModel } from "@/components/ConfirmModel";
import { Loader2, Pencil, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

const CourseChapter = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [courseChapterTitle, setCourseChapterTitle] = useState("");

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Fetch Course Chapter Function

  useEffect(() => {
    if (!courseId) {
      return;
    }

    const fetchValue = async () => {
      try {
        const res = await axios(`/api/courses/${courseId}/chapters`);
        setInitialData(res.data);
      } catch {
        console.log("Something went wrong fetching the value");
      }
    };

    fetchValue();
  }, [courseId]);

  // Handle Create Course Chapter Function

  const handleSubmit = async () => {
    setLoading(true);

    const values = {
      title: courseChapterTitle,
      description: "",
      videoUrl: "",
      isFree: false,
      isPublished: false,
    };

    try {
      const res = await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created");

      setInitialData((prevChapterTitle) => [...prevChapterTitle, res.data]);
      setLoading(false);
      setIsEditing(false);
      setCourseChapterTitle("");

      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  // Handle Delete Course Chapter Function

  const handleDelete = async (chapterId) => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/courses/${chapterId}/chapters`);
      toast.success("Chapter Deleted");

      setInitialData((prevChapterTitle) =>
        prevChapterTitle.filter((chapter) => chapter._id !== chapterId)
      );
      setDeleteLoading(false);

      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setDeleteLoading(false);
    }
  };

  // Handle Edit Course Chapter Function

  const onEdit = (chapterId) => {
    router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between ">
        Course Chapter
        <Button onClick={toggleEdit} variant="ghost">
          {!isEditing ? (
            <div className="flex items-center">
              <PlusCircle className="h-3 w-3 mr-1" />
            </div>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </Label>

      {isEditing && (
        <>
          <Input
            onChange={(e) => setCourseChapterTitle(e.target.value)}
            className="mt-2"
            placeholder="e.g Chapter Name"
            value={courseChapterTitle}
          />
          <Button
            onClick={handleSubmit}
            disabled={!courseChapterTitle || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create"}
          </Button>
        </>
      )}

      {!isEditing && initialData.length === 0 && (
        <p className="text-sm text-slate-600 italic">No chapters yet</p>
      )}

      {deleteLoading ? (
        <>
          <div className="flex justify-center items-center w-full h-full">
            <Loader2 className="animate-spin" />
          </div>
        </>
      ) : (
        <>
          {!isEditing && initialData.length > 0 && (
            <div>
              {initialData.map((data, i) => (
                <div key={i} className="mt-2 rounded-md">
                  <div className="flex items-center justify-between p-3 w-full bg-white text-muted-foreground rounded-md">
                    <div className="flex items-center gap-x-2">
                      <ConfirmModel onConfirm={() => handleDelete(data._id)}>
                        {deleteLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4 cursor-pointer text-black" />
                        )}
                      </ConfirmModel>
                      <p className="text-sm line-clamp-1 text-gray-600">
                        {data.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <div
                        className={cn(
                          "text-xs cursor-default text-white bg-black flex items-center h-6 rounded-md px-3",
                          data.isFree && "bg-sky-600"
                        )}
                      >
                        {data.isFree ? "Free" : "Not Free"}
                      </div>

                      <div
                        className={cn(
                          "text-xs cursor-default text-white bg-black flex items-center h-6 rounded-md px-3",
                          data.isPublished && "bg-sky-600"
                        )}
                      >
                        {data.isPublished ? "Published" : "Unpublished"}
                      </div>

                      <Pencil
                        className="h-3 w-3 cursor-pointer text-black"
                        onClick={() => onEdit(data._id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseChapter;
