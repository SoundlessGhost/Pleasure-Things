import TitleForm from "./TitleForm";
import ImageForm from "./ImageForm";
import PriceForm from "./PriceForm";
import CategoryForm from "./CategoryForm";
import CourseChapter from "./CourseChapter";
import AttachmentForm from "./AttachmentForm";
import DescriptionForm from "./DescriptionForm";

import { Activity, FileCheck2, Terminal } from "lucide-react";

const CourseForm = ({ course }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="space-y-6">
        <TitleForm courseId={course.id} course={course} />

        <DescriptionForm courseId={course.id} course={course} />

        <CategoryForm courseId={course.id} course={course} />

        <ImageForm courseId={course.id} course={course} />
      </div>

      <div>
        <h2 className="flex items-center gap-x-2 mb-6">
          <Terminal />
          Course Chapters
        </h2>

        <CourseChapter courseId={course.id} />

        <h2 className="flex items-center gap-x-2 my-6">
          <Activity /> Sell Your Course
        </h2>

        <PriceForm courseId={course.id} course={course} />

        <h2 className="flex items-center gap-x-2 my-6">
          <FileCheck2 /> Resources & Attachment
        </h2>

        <AttachmentForm courseId={course.id} />
      </div>
    </div>
  );
};

export default CourseForm;
