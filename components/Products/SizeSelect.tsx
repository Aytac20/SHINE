// components/SizeSelect.tsx
"use client";

import { useTransition } from "react";
import { updateCartItemSize } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";

export default function SizeSelect({
  itemId,
  currentSize,
  sizes,
}: {
  itemId: string;
  currentSize: string | null;
  sizes: string[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <select
      className='w-full max-w-[6rem] border border-gray-300 px-2 py-2 text-xs md:col-span-2'
      value={currentSize ?? ""}
      disabled={isPending}
      onChange={(e) => {
        const newSize = e.target.value;
        startTransition(async () => {
          await updateCartItemSize(itemId, newSize);
          router.refresh();
        });
      }}
    >
      <option value='' disabled>
        Size
      </option>
      {sizes.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
