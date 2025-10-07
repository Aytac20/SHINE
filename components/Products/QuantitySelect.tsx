"use client";

import { useTransition } from "react";
import { updateCartItemQuantity } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";

export default function QuantitySelect({
  itemId,
  quantity,
  stock,
}: {
  itemId: string;
  quantity: number;
  stock: number | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className='w-full max-w-[6rem] border border-gray-300 px-2 py-2 text-xs md:col-span-2'
      value={quantity}
      disabled={isPending || stock === 0}
      onChange={(e) => {
        const newQty = Number(e.target.value);
        startTransition(async () => {
          await updateCartItemQuantity(itemId, newQty);
          router.refresh();
        });
      }}
    >
      {stock && stock > 0 ? (
        Array.from({ length: stock }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))
      ) : (
        <option value={0} disabled>
          Out of stock
        </option>
      )}
    </select>
  );
}
