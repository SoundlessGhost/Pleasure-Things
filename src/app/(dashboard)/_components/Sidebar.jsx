import Logo from "./Logo";
import Link from "next/link";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col bg-white shadow-sm overflow-y-auto">
      <div>
        <Link href={"/"} className="flex items-center p-6 mb-1.5">
          <Logo />
          <p className="text-sm pl-2 font">Squad Ring ( LMS )</p>
        </Link>
        
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
