"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { TbArrowsUpDown } from "react-icons/tb";
import { GiSettingsKnobs } from "react-icons/gi";
import { useRouter, useSearchParams } from "next/navigation";
import Filter from "./Filter";
import { SortByProps } from "@/types";

const MobileSortBy: React.FC<SortByProps> = ({
  mainCategory,
  subCategories,
  colors,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (order: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", order);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='mb-4 grid grid-cols-2 border-1 border-gray-300 text-[1.1rem]'>
      <div className='border-r-1 border-gray-300 px-6 py-3'>
        <Sheet>
          <SheetTrigger className='flex h-full w-full items-center justify-between text-[0.8rem] transition duration-200 hover:text-amber-600'>
            <span>Filter </span>
            <GiSettingsKnobs />
          </SheetTrigger>
          <SheetContent className='bg-white lg:hidden'>
            <SheetHeader>
              <SheetTitle className='text-center'>Filter By</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Filter
              mainCategory={mainCategory}
              subCategories={subCategories}
              colors={colors}
            />
          </SheetContent>
        </Sheet>
      </div>
      <div className='border-r-1 border-gray-300 px-6 py-3'>
        <Sheet modal={true}>
          <SheetTrigger className='flex h-full w-full items-center justify-between text-[0.8rem] transition duration-200 hover:text-amber-600'>
            <span>Sort</span>
            <TbArrowsUpDown />
          </SheetTrigger>
          <SheetContent side='bottom' className='bg-white pb-4 lg:hidden'>
            <SheetHeader>
              <SheetTitle className='text-center'>Sort By</SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className='flex flex-col gap-2 text-xs'>
              <button
                className='cursor-pointer px-4 py-2 text-gray-700 transition duration-150 hover:bg-gray-100'
                onClick={() => updateSort("desc")}
              >
                Price High to Low
              </button>
              <button
                className='cursor-pointer px-4 py-2 text-gray-700 transition duration-150 hover:bg-gray-100'
                onClick={() => updateSort("asc")}
              >
                Price Low to High
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileSortBy;
