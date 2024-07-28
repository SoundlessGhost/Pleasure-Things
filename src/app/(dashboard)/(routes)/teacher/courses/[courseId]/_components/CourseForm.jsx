import TitleForm from "./TitleForm";
import ImageForm from "./ImageForm";
import PriceForm from "./PriceForm";
import CategoryForm from "./CategoryForm";
import CourseChapter from "./CourseChapter";
import AttachmentForm from "./AttachmentForm";
import DescriptionForm from "./DescriptionForm";

import { Activity, FileCheck2, Terminal } from "lucide-react";

const CourseForm = ({ values }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      <div className="space-y-6">
        <TitleForm courseId={values._id} value={values} />

        <DescriptionForm courseId={values._id} value={values} />

        <CategoryForm courseId={values._id} value={values} />

        <ImageForm courseId={values._id} value={values} />
      </div>

      <div>
        <h2 className="flex items-center gap-x-2 mb-6">
          <Terminal />
          Course Chapters
        </h2>

        <CourseChapter courseId={values._id} value={values} />

        <h2 className="flex items-center gap-x-2 my-6">
          <Activity /> Sell Your Course
        </h2>

        <PriceForm courseId={values._id} value={values} />

        <h2 className="flex items-center gap-x-2 my-6">
          <FileCheck2 /> Resources & Attachment
        </h2>

        <AttachmentForm courseId={values._id} value={values} />
      </div>
    </div>
  );
};

export default CourseForm;
