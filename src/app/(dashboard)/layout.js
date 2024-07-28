import React from "react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] w-full md:pl-56 fixed inset-y-0 z-50">
        <Navbar />
      </div>
      
      <div className="hidden md:flex flex-col w-56 h-full fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
