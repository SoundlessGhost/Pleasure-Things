import CourseSidebar from "./CourseSidebar";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileCourseNavbar = ({ course, chapters }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-70 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <CourseSidebar course={course} chapters={chapters} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileCourseNavbar;
