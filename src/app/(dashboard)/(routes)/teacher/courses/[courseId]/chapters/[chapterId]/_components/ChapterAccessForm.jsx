"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import axios from "axios";
import toast from "react-hot-toast";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil } from "lucide-react";

const ChapterAccessForm = ({ courseId, value, chapterId }) => {
  const [isFree, setIsFree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const toggleEdit = () => setIsEditing((current) => !current);

  // Handle Patch Course Description Function

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, {
        isFree: isFree,
      });
      toast.success("Chapter Setting Updated");

      setLoading(false);
      setIsEditing(false);

      value.isFree = isFree;
      router.refresh();
    } catch {
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 p-4 rounded-md">
      <Label className="text-sm font-[600] flex items-center justify-between mb-2">
        Chapter Access
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
          <div className="flex items-center space-x-2">
            <Checkbox
              Checked={isFree}
              onCheckedChange={(checked) => setIsFree(checked)}
            />
            <label className="text-xs font-medium">
              Check this box if you want to make this chapter isFree for preview
            </label>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!isFree || loading}
            className={"mt-4 w-24"}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </>
      )}
      {!isEditing && (
        <div>
          {value?.isFree ? (
            <p className="text-sm text-slate-600 italic">
              This chapter is now free for preview.
            </p>
          ) : (
            <p className="text-sm text-slate-600 italic">
              This chapter is not free. {value.isFree}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChapterAccessForm;
