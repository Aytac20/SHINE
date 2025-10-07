"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", order);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex w-full cursor-pointer justify-end py-2 pr-4'>
      <HoverCard>
        <HoverCardTrigger className='mr-4 flex items-center space-x-2 rounded-md border border-gray-300 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100'>
          <span>Sort by</span>
          <IoIosArrowDown className='text-gray-500' />
        </HoverCardTrigger>
        <HoverCardContent className='z-1000 mt-2 mr-8 min-w-[130px] rounded-sm border border-gray-300 bg-white text-xs shadow-none'>
          <div className='flex flex-col'>
            <button
              onClick={() => updateSort("desc")}
              className='cursor-pointer px-4 py-2 text-gray-700 transition duration-150 hover:bg-gray-100'
            >
              Price High to Low
            </button>
            <button
              onClick={() => updateSort("asc")}
              className='cursor-pointer px-4 py-2 text-gray-700 transition duration-150 hover:bg-gray-100'
            >
              Price Low to High
            </button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
