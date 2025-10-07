import Link from "next/link";
import { MdOutlineErrorOutline } from "react-icons/md";
export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center  flex-col">
      <MdOutlineErrorOutline className="text-[20rem] text-zinc-200" />
      <h2 className="text-xl text-zinc-400">Not Found</h2>
      <p className="text-zinc-300">Could not find requested resource</p>
      <Link href="/" className="underline">
        {" "}
        Home
      </Link>
    </div>
  );
}
