import Link from "next/link";
import React from "react";

const EmptyFavoriteList = () => {
  return (
    <div className="w-full h-[40rem] flex flex-col justify-center items-center gap-4">
      <p className="text-xl text-center text-zinc-300">
        Your favorites list is empty. Please add one.
      </p>
      <Link href="/" className="underline">
        Go to Home
      </Link>
    </div>
  );
};

export default EmptyFavoriteList;
