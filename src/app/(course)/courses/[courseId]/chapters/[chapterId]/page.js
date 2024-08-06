"use client";
import Link from "next/link";
import Image from "next/image";
import Preview from "@/components/Preview";
import useAttachment from "@/hooks/useAttachment";
import useSingleCourse from "@/hooks/useSingleCourse";
import useSingleChapter from "@/hooks/useSingleChapter";
import CourseEnrollButton from "./_components/CourseEnrollButton";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LockBanner } from "@/components/Banner";
import { File, Loader2, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

const ChaptersIdPage = ({ params }) => {
  const { courseId, chapterId } = params;
  const { course } = useSingleCourse(courseId);
  const { attachment } = useAttachment(courseId);
  const { chapter } = useSingleChapter(courseId, chapterId);

  if (!chapter || !course) {
    <p>loading...</p>;
  } 

  const isPurchase = false;
  const isLock = !chapter?.isFree;

  return (
    <>
      {isLock && <LockBanner />}

      <div
        className={cn(
          "bg-slate-50 font p-4",
          isPurchase ? "block" : "md:grid grid-cols-[7fr,5fr]"
        )}
      >
        <div>
          {/* Render Chapter Video  */}

          <div className="flex flex-col max-w-4xl mx-auto aspect-video relative">
            {!chapter?.videoUrl && !isLock && (
              <div className="inset-0 absolute flex items-center justify-center bg-slate-800">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
              </div>
            )}

            {isLock && (
              <div className="inset-0 rounded-md absolute flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
                <Lock className="h-8 w-8 " />
                <p className="text-sm">This chapter is lock</p>
              </div>
            )}

            {!isLock && (
              <video
                width="320"
                height="100"
                controls
                className={cn(
                  "w-full object-cover h-[300px] rounded-md",
                  isPurchase && "md:h-[500px]"
                )}
              >
                <source src={chapter?.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Render Chapter Information  */}

          <div className="border p-4 mt-16 bg-white rounded-md">
            <div className="p-4 flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-2xl font-semibold mb-2">{chapter?.title}</h2>

              {isPurchase ? null : (
                <CourseEnrollButton courseId={courseId} price={course.price} />
              )}
            </div>

            {isPurchase ? (
              <>
                <Separator />
                <Preview value={chapter.description} />
                <Separator />

                {attachment?.attachment && (
                  <div className="flex items-center p-4 w-full bg-slate-300 text-muted-foreground gap-x-2 mt-3">
                    <File className="h-4 w-4" />
                    <a
                      href={attachment?.attachment}
                      target="_blank"
                      className="text-xs line-clamp-1"
                    >
                      {attachment?.attachment}
                    </a>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* When Not Purchase Course */}

        <div className="md:pl-4 md:mt-0 mt-4">
          {!isPurchase && (
            <div className="p-8 flex flex-col gap-y-2 border rounded-md bg-gradient-to-r text-white from-[#395877] to-[#032038]">
              <h2 className="font-[600] text-[18px] mb-2">
                Ready to start building?
              </h2>
              <p className="text-sm mb-4">
                Unlock all courses, get access to source code, and more.
              </p>
              <Button className="bg-white hover:bg-white text-black">
                Start watching
              </Button>
            </div>
          )}

          <Link
            href={"https://github.com/SoundlessGhost/Squad-Ring-LMS-"}
            target="_blank"
          >
            <div className="p-4 my-4 flex flex-col border bg-white rounded-md items-center justify-center">
              <Image src={"/github.png"} alt="github" height={30} width={30} />
              <p className="text-sm mt-2 text-slate-500 ">Source code</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ChaptersIdPage;
