"use client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { isTeacher } from "@/lib/Teacher";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const TeacherLayout = ({ children }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId !== null) {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center mt-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // if (!isTeacher(userId)) {
  //   redirect("/");
  // }

  return <div>{children}</div>;
};

export default TeacherLayout;
