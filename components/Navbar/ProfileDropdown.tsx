import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export function ProfileDropdown() {
  const { data: session } = useSession();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Image
          src={session?.user.image ?? ""}
          alt={session?.user.name ?? ""}
          className='cursor-pointer rounded-full'
          width={25}
          height={25}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='mt-2 mr-3 rounded-sm border-[1px] border-gray-300 bg-white text-[0.9rem] shadow-none'
        align='start'
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className='text-xs tracking-wide transition duration-200 hover:bg-gray-200'>
            <Link href='/orders'> My Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='text-xs tracking-wide transition duration-200 hover:bg-gray-200'>
            <Link href='/favorites'>Favorites</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='text-xs tracking-wide transition duration-200 hover:bg-gray-200'>
            <button onClick={() => signOut()} className='cursor-pointer'>
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
