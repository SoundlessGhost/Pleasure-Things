"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PublishedBanner, UnpublishedBanner } from "@/components/Banner";
import { ArrowLeft, Eye, LayoutDashboard, Loader2, Video } from "lucide-react";

import useAllChapters from "@/hooks/useAllChapters";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";

const ChapterEditPage = ({ params }) => {
  const router = useRouter();

  const { courseId, chapterId } = params;
  const { chapters } = useAllChapters(courseId);

  const [loading, setLoading] = useState(false);
  const [filteredChapter, setFilteredChapter] = useState({});

  // Filter Single Chapter Some Issue That's Why Filter Like That

  useEffect(() => {
    if (chapters.length > 0) {
      const chapter = chapters.find((chapter) => chapter._id === chapterId);
      setFilteredChapter(chapter);
    }
  }, [chapters, chapterId]);

  // Chapter On Published Function

  const onPublished = async () => {
    setLoading(true);
    try {
      const currentPublishedState = filteredChapter.isPublished;

      const res = await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        {
          isPublished: !currentPublishedState,
        }
      );
      setFilteredChapter(res.data);

      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fields Required Logic

  const requiredFiled = [
    filteredChapter.title,
    filteredChapter.description,
    filteredChapter.videoUrl,
  ];

  const totalFields = requiredFiled.length;
  const completedFields = requiredFiled.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isCompleted = requiredFiled.every(Boolean);

  // TODO : videoUrl & almost 1 chapter add otherwise not published

  return (
    <>
      {filteredChapter.isPublished ? (
        <PublishedBanner />
      ) : (
        <UnpublishedBanner />
      )}

      <div className="p-6 font">
        <div>
          <Link
            href={`/teacher/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-70 transition mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Course Setup
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Chapter Creation</h1>
            <p className=" text-muted-foreground text-xs">
              Complete all fields {completionText}
            </p>
          </div>

          <Button onClick={onPublished} disabled={loading || !isCompleted}>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <p>{filteredChapter.isPublished ? "Unpublish" : "Publish"}</p>
            )}
          </Button>
        </div>

        {/* Render Customize chapter Components */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 ">
          <div>
            <div className="flex items-center gap-x-2 mb-10">
              <LayoutDashboard />
              <h2 className=" text-slate-600 text-2xl">
                Customize your chapter
              </h2>
            </div>

            <div className="flex flex-col gap-y-6">
              <ChapterTitleForm
                courseId={courseId}
                chapterId={chapterId}
                value={filteredChapter}
              />

              <ChapterDescriptionForm
                courseId={courseId}
                chapterId={chapterId}
                value={filteredChapter}
              />
            </div>

            <div>
              <h2 className="flex items-center gap-x-2 my-6">
                <Eye />
                Access Setting
              </h2>

              <ChapterAccessForm
                courseId={courseId}
                chapterId={chapterId}
                value={filteredChapter}
              />
            </div>
          </div>

          <div>
            <div>
              <h2 className="flex items-center gap-x-2 mb-6">
                <Video />
                Add a Video
              </h2>

              <ChapterVideoForm
                courseId={courseId}
                chapterId={chapterId}
                value={filteredChapter}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterEditPage;
