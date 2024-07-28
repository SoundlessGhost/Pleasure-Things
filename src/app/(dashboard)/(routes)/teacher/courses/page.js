"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import { TableData } from "./_component/TableData";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch Course Function

  useEffect(() => {
    const fetchValue = async () => {
      try {
        const res = await axios("/api/courses");
        setCourses(res.data);
      } catch {
        console.log("something wrong failed to fetch");
      }
    };
    fetchValue();
  }, []);

  return (
    <div className="p-6">
      <TableData data={courses} />
    </div>
  );
};

export default CoursesPage;
