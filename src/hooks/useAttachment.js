"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useAttachment(courseId) {
  const { refetch, data: attachment = {} } = useQuery({
    queryKey: ["attachment"],
    queryFn: async () => {
      if (!courseId) {
        return;
      }
      const res = await axios(`/api/courses/${courseId}/attachment`);
      return res.data;
    },
  });
  return { attachment, refetch };
}
