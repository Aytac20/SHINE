import Link from "next/link";
import React from "react";
import { GiShoppingCart } from "react-icons/gi";

const EmptyCart = () => {
  return (
    <div className=" w-full h-[40rem] flex justify-center items-center flex-col gap-4">
      <GiShoppingCart className="text-[20rem] text-zinc-200" />
      <p className="text-2xl text-center text-zinc-300 ml-10">
        Empty shopping bag
      </p>
      <Link href="/" className="underline ml-10 ">
        Go Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
