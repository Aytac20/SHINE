"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Logo from "./Logo";
import { ProfileDropdown } from "./ProfileDropdown";
import { MobileNavbar } from "./MobileNavbar";
import { PiBasket, PiHeart } from "react-icons/pi";
import NavbarLinks from "./NavbarLinks";
import { NavbarProps } from "@/types";
import { CiLogin } from "react-icons/ci";
import { signIn, useSession } from "next-auth/react";
import SearchArea from "./SearchArea";
type NavbarClientProps = NavbarProps & {
  cartItemsCount: number;
};
export default function NavbarClient({
  categories,
  cartItemsCount,
}: NavbarClientProps) {
  const [query, setQuery] = useState<string>("");
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className='navbar'>
      <nav className='mx-auto w-[95%]'>
        {/* Top Section */}
        <div className='flex items-center justify-between gap-4 py-4'>
          <div className='flex flex-grow items-center gap-4'>
            {/* Mobile view menu */}
            <div className='flex lg:hidden'>
              <MobileNavbar categories={categories} />
            </div>
            <div>
              <Logo />
            </div>
            <div className='search-input hidden max-w-[70%] flex-grow items-center lg:flex'>
              <IoSearchOutline className='text-gray-400' />
              <input
                type='search'
                placeholder='What are you looking for today?'
                className='w-[70%] text-xs placeholder:text-xs'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && <SearchArea query={query} setQuery={setQuery} />}
            </div>
          </div>

          <div className='flex items-center gap-6 text-[1.2rem] md:text-[1.3rem]'>
            <Link href='/favorites'>
              <PiHeart />
            </Link>
            <Link href='/cart' className='relative p-2'>
              <PiBasket />
              {cartItemsCount > 0 && (
                <span className='absolute top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-[11px] leading-none font-medium text-white'>
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <ProfileDropdown />
            ) : (
              <button onClick={() => signIn()}>
                <CiLogin />
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className='mb-3 hidden text-gray-300 lg:flex' />
        {/* Categories */}
        <NavbarLinks categories={categories} />
        {/* Mobile search */}
        <div className='search-input relative flex flex-grow items-center lg:hidden'>
          <IoSearchOutline className='text-gray-400' />
          <input
            type='search'
            placeholder='What are you looking for today?'
            className='placeholder:text-xs'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && <SearchArea query={query} setQuery={setQuery} />}
        </div>
      </nav>
    </div>
  );
}
