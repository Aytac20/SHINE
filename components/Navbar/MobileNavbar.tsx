import { useState } from "react";

import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import Logo from "./Logo";
import { IoIosArrowDown } from "react-icons/io";
import { NavbarProps } from "@/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export function MobileNavbar({ categories }: NavbarProps) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategoryId(openCategoryId === id ? null : id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="text-2xl">
        <LuMenu />
      </SheetTrigger>
      <SheetContent className="bg-light" side="left">
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 ">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Category Button */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-[90%] mx-auto flex justify-between items-center font-sora py-2 px-3 text-left text-[0.8rem] tracking-wider text-gray-800 hover:bg-gray-100 rounded-md transition"
              >
                <Link href={`/products/${category.slug}`}>{category.name}</Link>
                <span
                  className={`transition-transform duration-300 ${
                    openCategoryId === category.id ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <IoIosArrowDown />
                </span>
              </button>

              {/* Subcategory Dropdown */}
              {openCategoryId === category.id && (
                <div className="pl-6 mt-2 flex flex-col gap-1 text-[0.8rem] mr-2">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/products/${category.slug}/${sub.slug}`}
                      className="block py-1 px-3 rounded-md cursor-pointer text-gray-600 hover:bg-gray-200 transition duration-300"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
