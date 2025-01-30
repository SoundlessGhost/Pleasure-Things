"use client";
import Link from "next/link";
import SearchInput from "./SearchInput";

import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isSearchPage = pathname === "/";
  const isCoursePage = pathname?.includes("/courses");
  const isTeacherPage = pathname?.startsWith("/teacher");

  const { userId } = useAuth();

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center ml-auto gap-x-2 font">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"} className="hover:text-muted-foreground">
            <Button>Exit</Button>
          </Link>
        ) : userId ? (
          <Link href={"/teacher/courses"}>
            <Button>Teacher</Button>
          </Link>
        ) : (
          <Button disabled className="opacity-50 cursor-not-allowed">
            Teacher
          </Button>
        )}

        {!userId && (
          <Link
            href={"/sign-in"}
            className={`${buttonVariants({ variant: "outline" })}`}
          >
            Login
          </Link>
        )}

        <UserButton className="h-10 w-10" />
      </div>
    </>
  );
};

export default NavbarRoutes;
