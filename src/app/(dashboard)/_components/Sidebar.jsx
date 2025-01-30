import Logo from "./Logo";
import Link from "next/link";
import SidebarRoutes from "./SidebarRoutes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  return (
    <div className="h-full md:w-[290px] border-r flex flex-col bg-white shadow-sm overflow-y-auto">
      <div>
        <Link href={"/"} className="flex items-center p-6 mb-1.5">
          <Logo />
          <div className="text-xs font-bold pl-2 font">
            <p className="text-[#3b809b] text-[18px]">Pleasure Things </p>
            <p>Build something great!</p>
          </div>
        </Link>

        <SidebarRoutes />
      </div>

      {/* When Not Purchase Course */}

      <div className="mt-auto p-4">
        <div className="p-4 flex flex-col border rounded-md">
          <h2 className="font-[600] mb-2">Upgrade to Pro</h2>
          <p className="text-sm text-slate-500 mb-4">
            Unlock all courses, get access to source code, and more.
          </p>
          <Button>Upgrade</Button>
        </div>
      </div>
      <Separator />
      <div className="p-6 font text-xs text-slate-500 flex items-center justify-between">
        <h5>
          &copy; {new Date().getFullYear()} <span>Pleasure Things ( LMS )</span>
        </h5>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <Ellipsis size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/terms-condition`} target="_blank">
              <DropdownMenuItem className="font cursor-pointer text-xs">
                Privacy Policy
              </DropdownMenuItem>
            </Link>

            <Link href={`/terms-condition`} target="_blank">
              <DropdownMenuItem className="font cursor-pointer text-xs">
                Terms & Condition
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
