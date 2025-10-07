"use client";
import { startTransition, useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  Product as ProductModel,
  ProductImage,
  ProductVariant,
  Session,
 
} from "@prisma/client";
import { addToCart } from "@/lib/actions/cart.actions";
import toast from "react-hot-toast";
import { toggleFavoriteAction } from "@/app/actions";
import { useRouter } from "next/navigation";

export interface ProductDetail extends ProductModel {
  images: ProductImage[];
  variants: ProductVariant[];
}

export default function ProductDetailClient({
  product,
  userEmail,
}: {
  product: ProductDetail;
  userEmail: string | null;
}) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const sizes = Array.from(
    new Set(product.variants.map((v) => v.size).filter((s): s is string => !!s))
  );
  const [isFavorite, setIsFavorite] = useState<boolean>(
    product.isFavorite ?? false
  );
  const router = useRouter();
  const handleFavoriteClick = () => {
    startTransition(async () => {
      try {
        await toggleFavoriteAction(product.id);
        setIsFavorite((prev) => !prev);
        toast.success(
          !isFavorite ? " Added to favorites " : "Removed from favorites"
        );
      } catch {
        toast.error("Failed to update favorites");
      }
    });
  };

  async function handleAddToCart() {
    try {
      if (!userEmail) {
        toast.error("Please log in to add items to your cart.");
        router.push("/login");
        return;
      }
      const result = await addToCart(
        product.id,
        1,
        selectedSize,
        product.variants?.[0]?.color
      );
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart.");
    }
  }
  const selectedVariant = product.variants.find(
    (variant) => variant.size === selectedSize
  );
  return (
    <div className='mx-auto px-4 py-12 sm:px-4 lg:w-[95%] lg:px-6'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Images */}
        <div className='flex flex-col gap-4 md:flex-row'>
          {/* thumbnails */}
          <div className='order-2 flex flex-row items-center gap-4 px-4 md:order-1 md:flex-col'>
            {product.images.map((image) =>
              image.url ? (
                <div
                  key={image.id}
                  onMouseEnter={() => setSelectedImage(image.url)}
                  className={`h-[10rem] w-[6.5rem] cursor-pointer border ${
                    selectedImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  } overflow-hidden`}
                >
                  <Image
                    src={image.url}
                    width={100}
                    height={200}
                    alt={product.name}
                    className='h-full w-full object-cover'
                    quality={100}
                  />
                </div>
              ) : null
            )}
          </div>

          {/* main image */}
          <div className='order-1 flex flex-grow items-center justify-center md:order-2'>
            {selectedImage && (
              <Zoom>
                <Image
                  src={selectedImage}
                  width={600}
                  height={800}
                  alt={product.name}
                  className='max-h-[900px] object-contain'
                  quality={100}
                />
              </Zoom>
            )}
          </div>
        </div>

        {/* product info */}
        <div className='mx-auto flex w-full flex-col tracking-wide lg:w-[75%]'>
          <h1 className='mb-3 text-xl tracking-wider'>{product.name}</h1>
          <p className='mb-3 text-sm text-gray-600'>{product.description}</p>
          <p className='mb-6 text-lg tracking-wider'>
            ${product.price.toLocaleString()}
          </p>

          {/* color */}
          <div className='mb-4 flex items-center space-x-2 text-sm'>
            <span>Color</span> <span>—</span>{" "}
            <span>{product.variants?.[0]?.color}</span>
          </div>

          {/* size */}
          {sizes.length > 0 ? (
            <select
              id='size'
              className='mb-4 w-full rounded-none border border-gray-300 px-4 py-2 text-sm'
              value={selectedSize ?? ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value='' disabled>
                Select a size
              </option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          ) : (
            <p className='mb-6 text-sm text-gray-500'>
              No size options available
            </p>
          )}
          {selectedSize && selectedVariant && (
            <p className='mb-3 text-xs text-red-600'>
              {selectedVariant.stock > 0
                ? selectedVariant.stock <= 2
                  ? `Hurry! Only ${selectedVariant.stock} left in this size.`
                  : `In stock: ${selectedVariant.stock}`
                : "Out of stock"}
            </p>
          )}

          <button
            className='mb-4 w-full cursor-pointer bg-black py-3 text-sm text-white transition hover:bg-black/90'
            onClick={handleAddToCart}
            disabled={!selectedSize && sizes.length > 0}
          >
            {!selectedSize && sizes.length > 0
              ? "Please select a size"
              : "ADD TO CART"}
          </button>
          <button
            onClick={handleFavoriteClick}
            className='w-full cursor-pointer border border-zinc-700 py-3 text-xs transition duration-200 hover:bg-zinc-100'
          >
            <span>
              {isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
