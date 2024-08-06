"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

const SideBarItems = ({ Icon, label, href }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center text-sm pl-6 text-slate-500  hover:text-slate-600 hover:bg-gray-100 font-[600] transition-all",
        isActive &&
          "text-slate-800 hover:text-slate-800 bg-gray-100 hover:bg-gray-100"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={cn(isActive && "text-slate-800")} />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto border-2 h-[52px] border-[#00abf0] opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SideBarItems;
