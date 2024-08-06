"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useSingleCourse(courseId) {
  const { refetch, data: course = {} } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axios(`/api/courses/${courseId}`);
      return res.data;
    },
  });
  return { course, refetch };
}
