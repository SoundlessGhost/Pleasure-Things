"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { File, Loader2, Pencil, X } from "lucide-react";

const AttachmentForm = ({ courseId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [CourseAttachment, setCourseAttachment] = useState();

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Fetch Attachment Function

  useEffect(() => {
    if (!courseId) {
      return;
    }

    const fetchValue = async () => {
      try {
        const res = await axios(`/api/courses/${courseId}/attachment`);
        setInitialData(res.data);
      } catch {
        console.log("Something went wrong fetching the value");
      }
    };

    fetchValue();
  }, [courseId]);

  // Handle Create Attachment Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/attachment`, {
        attachment: CourseAttachment,
      });

      toast.success("Attachment Updated");
      setInitialData(response.data);
      setIsEditing(false); // Exit editing mode

      router.refresh(); // Refresh the page to sync with the server data
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Attachment Function

 const handleDelete = async (attachmentId) => {
   setLoading(true);
   try {
     console.log("Deleting attachment with ID:", attachmentId); // Debugging log
     await axios.delete(`/api/courses/${courseId}/attachment/${attachmentId}`);

     toast.success("Attachment Deleted");

     setCourseAttachment(null); // Clear the attachment in state
     setInitialData({}); // Clear the initial data
     router.refresh(); // Refresh the UI to reflect the deletion
   } catch (error) {
     console.error("Error in handleDelete:", error.response || error.message); // Log detailed error
     toast.error("Something went wrong while deleting the attachment");
   } finally {
     setLoading(false);
   }
 };


  if (!courseId) {
    return (
      <div className="w-full flex items-center justify-center mt-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between">
        Course Attachment
        {initialData.attachment ? null : (
          <Button onClick={toggleEdit} variant="ghost">
            {!isEditing ? (
              <div className="flex items-center">
                <Pencil onClick={toggleEdit} className="h-3 w-3 mr-1" />
              </div>
            ) : (
              <>Cancel</>
            )}
          </Button>
        )}
      </Label>

      {isEditing && (
        <div>
          <UploadDropzone
            endpoint="courseAttachment"
            onClientUploadComplete={(res) => {
              setCourseAttachment(res?.[0]?.url);
            }}
            onUploadError={(error) => {
              toast.error(`${error?.message}`);
            }}
          />

          <p className="text-muted-foreground text-xs">
            Add anything your students might need to complete the course.
          </p>

          <Button
            onClick={handleSubmit}
            disabled={!CourseAttachment || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}

      {!isEditing && !initialData.attachment && (
        <p className="text-sm text-slate-600 italic">No attachment yet</p>
      )}

      {initialData.attachment && (
        <div>
          <div className="flex items-center p-3 w-full bg-slate-300 text-muted-foreground gap-x-2 mt-3">
            <File className="h-4 w-4" />
            <p className="text-xs line-clamp-1">{initialData.attachment}</p>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X
                className="h-4 w-4 cursor-pointer"
                onClick={() => handleDelete(initialData.id)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
