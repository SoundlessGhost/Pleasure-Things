"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

const ChapterVideoForm = ({ courseId, value, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(value.videoUrl);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Fetch Course Video Function

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const res = await axios(
          `/api/courses/${courseId}/chapters/${chapterId}`
        );
        setVideoUrl(res.data.videoUrl);
      } catch {
        console.log("something wrong fetch value");
      }
    };
    fetchValue();
  }, [courseId, chapterId]);

  // Handle Patch Course Video Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        videoUrl: videoUrl,
      });

      value.videoUrl = videoUrl;
      setIsEditing(false);

      toast.success("Video Updated");
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md ">
      <Label className="text-sm font-[600] flex items-center mb-2 justify-between">
        Chapter Video
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

      {/* Video Upload Dropzone */}

      {isEditing && (
        <div>
          <UploadDropzone
            endpoint="chapterVideo"
            onClientUploadComplete={(res) => {
              setVideoUrl(res?.[0]?.url);
            }}
            onUploadError={(error) => {
              toast.error(`${error?.message}`);
            }}
          />

          <Button
            onClick={handleSubmit}
            disabled={!videoUrl || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}

      {!isEditing && !videoUrl && (
        <p className="text-sm text-slate-600 italic">No Video yet</p>
      )}

      {/* Render Video */}

      {videoUrl && !isEditing && (
        <>
          <video
            width="320"
            height="100"
            controls
            className=" w-full object-cover h-[300px] rounded-md"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </div>
  );
};

export default ChapterVideoForm;
