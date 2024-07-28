import Sidebar from "./Sidebar";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-70 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-white">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
