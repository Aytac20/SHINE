"use client";
import { useTransition } from "react";
import { removeCartItem } from "@/lib/actions/cart.actions";
import { useRouter } from "next/navigation";
export default function RemoveButton({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className='cursor-pointer underline'
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await removeCartItem(itemId);
          router.refresh();
        });
      }}
    >
      {isPending ? "Removing..." : "Remove"}
    </button>
  );
}
