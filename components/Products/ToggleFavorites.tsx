"use client";

import { useState, startTransition } from "react";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toggleFavoriteAction } from "@/app/actions";

interface ToggleFavoritesProps {
  productId: string;
  isFavorite: boolean;
}

export default function ToggleFavorites({
  productId,
  isFavorite: initial,
}: ToggleFavoritesProps) {
  const [isFavorite, setIsFavorite] = useState(initial);
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await toggleFavoriteAction(productId);

      const newState = !isFavorite;
      setIsFavorite(newState);

      if (newState) {
        toast.success("Added to favorites ");
      } else {
        toast.success("Removed from favorites");
      }
      router.refresh();
    });
  };

  return (
    <button
      className='absolute top-1 right-1 z-10 cursor-pointer text-lg text-zinc-400'
      onClick={handleClick}
    >
      {isFavorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
    </button>
  );
}
