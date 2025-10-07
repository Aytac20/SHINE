import { ProductProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ToggleFavorites from "../Products/ToggleFavorites";

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <li className='relative flex w-full list-none flex-col items-center justify-center gap-2'>
      {/* Favorite button is outside Link */}
      <ToggleFavorites
        isFavorite={product.isFavorite ?? false}
        productId={product.id}
      />

      <Link
        href={`/products/${product.category.slug}/${
          product.subCategory ? product.subCategory.slug : "uncategorized"
        }/${product.id}`}
        className='group flex w-full flex-col items-center justify-center'
      >
        <div className='mb-4 flex h-[320px] w-[160px] items-center justify-center'>
          <Image
            height={320}
            width={160}
            src={product.images[0]?.url}
            alt={product.name}
            priority
            className='h-full w-full object-contain'
          />
        </div>

        <p className='mb-0.5 text-center text-[9px] font-bold tracking-[0.15em] uppercase'>
          {product.name}
        </p>

        <p className='mb-2 text-center text-[10px] leading-snug'>
          {product.description}
        </p>

        <p className='text-center text-sm font-semibold'>
          ${product.price.toLocaleString()}
        </p>
      </Link>
    </li>
  );
};

export default Product;
