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
      const res = await axios(`/api/courses/${courseId}`);
      return res.data;
    },
    enabled: !!courseId, // Ensure the query only runs when courseId is valid
  });

  return { course, refetch, error, isLoading };
}
