import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarProps } from "@/types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
const NavbarLinks: React.FC<NavbarProps> = ({ categories }) => {
  const pathname = usePathname();
  return (
    <div className='mb-3 hidden flex-grow justify-center lg:flex'>
      <ul className='flex items-center gap-8 px-4 text-xs tracking-wider'>
        {categories.map((item) => {
          const categoryPath = `/products/${item.slug}`;
          const isCategoryActive = pathname.startsWith(categoryPath);

          return (
            <li key={item.id} className='relative'>
              <HoverCard openDelay={500} closeDelay={200}>
                <HoverCardTrigger asChild>
                  <Link
                    href={categoryPath}
                    className={`group relative cursor-pointer py-3 transition duration-300 ease-in-out ${
                      isCategoryActive ? "text-gray-500" : "text-black"
                    }`}
                    prefetch
                  >
                    <span className='relative z-10'>{item.name}</span>
                    <span className='absolute bottom-0 left-0 w-full origin-center scale-x-0 transform border-b-[1px] border-black transition-transform duration-300 ease-in-out group-hover:scale-x-100'></span>
                  </Link>
                </HoverCardTrigger>

                <HoverCardContent className='flex min-w-[180px] flex-col gap-2 rounded-none border-[1px] border-gray-300 bg-white p-2 text-[0.7rem] shadow-none'>
                  {item.subcategories.map((sub) => {
                    const subPath = `${categoryPath}/${sub.slug}`;
                    const isSubActive = pathname === subPath;
                    return (
                      <Link
                        href={subPath}
                        key={sub.id}
                        className={`cursor-pointer list-none rounded-none px-3 py-1 text-xs tracking-wider transition duration-300 ease-in-out ${
                          isSubActive ? "bg-gray-100" : "hover:bg-gray-100"
                        }`}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </HoverCardContent>
              </HoverCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavbarLinks;
