import React from "react";
import MobileNavbar from "./MobileNavbar";
import NavbarRoutes from "@/components/NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-4 border-b flex items-center bg-white shadow-sm h-full">
      <MobileNavbar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;