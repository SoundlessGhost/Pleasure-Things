"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useSingleChapter(courseId, chapterId) {
  const { refetch, data: chapter = {} } = useQuery({
    queryKey: ["chapter"],
    queryFn: async () => {
      const res = await axios(`/api/courses/${courseId}/chapters/${chapterId}`);
      return res.data;
    },
  });
  return { chapter, refetch };
}
