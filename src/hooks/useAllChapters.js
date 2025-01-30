"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useAllChapters(courseId) {
  const { refetch, data: chapters = [] } = useQuery({
    queryKey: ["chapters", courseId], 
    queryFn: async () => {
      const res = await axios.get(`/api/courses/${courseId}/chapters`);
      return res.data;
    },
  });

  return { chapters, refetch };
}
