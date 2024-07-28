"use client";
import Link from "next/link";
import SearchInput from "./SearchInput";

import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isPlayerPage = pathname?.includes("/chapter");
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isSearchPage = pathname === "/search";

  const { userId } = useAuth();

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center ml-auto gap-x-2 font">
        {isTeacherPage || isPlayerPage ? (
          <Link href={"/"} className=" hover:text-muted-foreground">
            <Button>Exit</Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button>Teacher</Button>
          </Link>
        )}
        {!userId && (
          <Link
            href={"/sign-in"}
            className={`${buttonVariants({ variant: "outline" })}`}
          >
            Login
          </Link>
        )}

        <UserButton />
      </div>
    </>
  );
};

export default NavbarRoutes;
