"use client";
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
    return <p>Loading...</p>;
  }

  if (!isTeacher(userId)) {
    redirect("/");
  }

  return <div>{children}</div>;
};

export default TeacherLayout;
