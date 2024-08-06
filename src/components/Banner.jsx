import React from "react";
import { AlertTriangle, CircleCheckBig } from "lucide-react";

const UnpublishedBanner = () => {
  return (
    <div className="bg-yellow-200/80 border-yellow-200 text-primary flex items-center font w-full h-[52px] px-2">
      <AlertTriangle className="h-4 w-4 mr-2" />
      <p>This chapter is unpublished. It will not be visible in the course.</p>
    </div>
  );
};

const LockBanner = () => {
  return (
    <div className="bg-yellow-200/80 border-yellow-200 text-primary flex items-center font w-full h-[52px] px-2">
      <AlertTriangle className="h-4 w-4 mr-2" />
      <p>You need to purchase this course to watch this chapter.</p>
    </div>
  );
};

const PublishedBanner = () => {
  return (
    <div className=" bg-emerald-400/80 border-emerald-200 text-primary flex items-center font w-full h-[52px] px-2">
      <CircleCheckBig className="h-4 w-4 mr-2" />
      <p>This chapter is published. It will be now visible in the course.</p>
    </div>
  );
};

export { UnpublishedBanner, PublishedBanner, LockBanner };
