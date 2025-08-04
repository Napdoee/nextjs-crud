"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlerSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1">
      <input
        type="text"
        className="py-2 pl-10 border border-gray-200 rounded-sm outline-2 w-full text-sm"
        placeholder="Search..."
        onChange={(e) => handlerSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <IoSearch className="top-2 left-3 absolute w-5 h-5 text-gray-500" />
    </div>
  );
};

export default Search;
