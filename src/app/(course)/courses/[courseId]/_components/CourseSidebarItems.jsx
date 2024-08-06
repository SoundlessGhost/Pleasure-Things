"use client";

import { cn } from "@/lib/utils";
import { Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const CourseSideBarItems = ({ chapter, courseId }) => {
  const { title, _id, isFree } = chapter;

  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname.includes(_id);
  const Icon = isFree ? <PlayCircle size={20} /> : <Lock size={20} />;

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${_id}`);
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center text-sm pl-6 text-slate-500  hover:text-slate-600 hover:bg-gray-100 font-[600] transition-all",
          isActive && "bg-gray-100 hover:bg-gray-100"
        )}
      >
        <div className="flex items-center gap-x-2 py-4">
          {Icon} 
          {title}
        </div>

        <div
          className={cn(
            "ml-auto border-2 h-[52px] border-emerald-700 opacity-0 transition-all",
            isActive && "opacity-100"
          )}
        />
      </button>
    </>
  );
};

export default CourseSideBarItems;
