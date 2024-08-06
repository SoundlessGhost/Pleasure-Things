"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

const ImageForm = ({ courseId, value }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(value.courseImage);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Fetch Course Image Function

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const res = await axios(`/api/courses/${courseId}`);

        setImageUrl(res.data.courseImage);
      } catch {
        console.log("something wrong fetch value");
      }
    };
    fetchValue();
  }, [courseId]);

  // Handle Patch Course Image Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}`, { courseImage: imageUrl });

      value.courseImage = imageUrl;
      setIsEditing(false);

      toast.success("Image Updated");
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center mb-2 justify-between">
        Course Image
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
        <div>
          <UploadDropzone
            endpoint="courseImage"
            onClientUploadComplete={(res) => {
              setImageUrl(res?.[0]?.url);
            }}
            onUploadError={(error) => {
              toast.error(`${error?.message}`);
            }}
          />

          <Button
            onClick={handleSubmit}
            disabled={!imageUrl || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}

      {!isEditing && !imageUrl && (
        <p className="text-sm text-slate-600 italic">No image yet</p>
      )}

      {!isEditing && imageUrl && (
        <Image
          src={imageUrl}
          height={200}
          width={200}
          alt="course"
          className="object-cover rounded-md w-full"
        />
      )}
    </div>
  );
};

export default ImageForm;
