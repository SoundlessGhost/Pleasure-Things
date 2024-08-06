"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CourseEnrollButton = ({ courseId, price }) => {
  const router = useRouter();

  const handleEnrollClick = () => {
    router.push("/payment");
  };

  return (
    <Button className="w-full md:w-auto" onClick={handleEnrollClick}>
      Enroll for ${price}
    </Button>
  );
};

export default CourseEnrollButton;
