"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useSingleCourse(courseId) {
  const {
    refetch,
    data: course,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) throw new Error("courseId is required");
      const res = await axios(`/api/courses/${courseId}`);
      return res.data;
    },
    enabled: !!courseId, // Ensure the query only runs when courseId is valid
    staleTime: 5 * 60 * 1000, // Optional: cache data for 5 minutes
  });

  return { course, refetch, error, isLoading };
}
