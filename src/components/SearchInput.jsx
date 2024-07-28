"use client";
import queryString from "query-string";

import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          category: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedValue, router, pathname]);

  return (
    <div className="relative">
      <Search className="h-4 w-4 text-slate-500 absolute  top-3 left-3" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
        placeholder="Search by category..."
        value={value}
      />
    </div>
  );
};

export default SearchInput;
