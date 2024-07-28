"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PublishedBanner, UnpublishedBanner } from "@/components/Banner";
import { ArrowLeft, Eye, LayoutDashboard, Loader2, Video } from "lucide-react";

import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";

const ChapterEditPage = ({ params }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredChapter, setFilteredChapter] = useState({});

  const router = useRouter();

  // Fetch Course Chapter Function

  useEffect(() => {
    if (!params.courseId) {
      return;
    }
    const fetchChapters = async () => {
      try {
        const res = await axios(`/api/courses/${params.courseId}/chapters`);
        setChapters(res.data);
      } catch (error) {
        console.log("Something went wrong fetching the chapters");
      }
    };

    fetchChapters();
  }, [params.courseId]);

  useEffect(() => {
    if (chapters.length > 0) {
      const chapter = chapters.find(
        (chapter) => chapter._id === params.chapterId
      );
      setFilteredChapter(chapter);
    }
  }, [chapters, params.chapterId]);

  // OnPublished Function

  const onPublished = async () => {
    setLoading(true);
    try {
      const currentPublishedState = filteredChapter.isPublished;
      const res = await axios.patch(
        `/api/courses/${params.courseId}/chapters/${params.chapterId}`,
        {
          isPublished: !currentPublishedState,
        }
      );
      setFilteredChapter(res.data);
      setLoading(false);
      
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
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
            href={`/teacher/courses/${params.courseId}`}
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
                courseId={params.courseId}
                chapterId={params.chapterId}
                value={filteredChapter}
              />

              <ChapterDescriptionForm
                courseId={params.courseId}
                chapterId={params.chapterId}
                value={filteredChapter}
              />
            </div>

            <div>
              <h2 className="flex items-center gap-x-2 my-6">
                <Eye />
                Access Setting
              </h2>

              <ChapterAccessForm
                courseId={params.courseId}
                chapterId={params.chapterId}
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
                courseId={params.courseId}
                chapterId={params.chapterId}
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
