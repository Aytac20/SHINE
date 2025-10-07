export const dynamic = "force-dynamic";
import Image from "next/image";
import { LuRefreshCcw } from "react-icons/lu";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import EmptyCart from "@/components/EmptyCart";
import QuantitySelect from "@/components/Products/QuantitySelect";
import SizeSelect from "@/components/Products/SizeSelect";
import RemoveButton from "@/components/Products/RemoveButton";
import PaymentSummary from "@/components/Products/PaymentSummary";
import { getMyCart } from "@/lib/actions/cart.actions";
export const metadata = {
  title: "Shopping Cart",
};
export default async function ShoppingBag() {
  const cart = await getMyCart();

  if (!cart || cart.cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className='mx-auto flex flex-col gap-4 px-6 lg:flex-row xl:max-w-[85%]'>
      <section className='flex-1 lg:mr-4'>
        <h2 className='mb-6 flex items-center py-4 text-xl tracking-wider text-zinc-700'>
          Shopping Bag
        </h2>

        <div className='border-x-[1px] border-t-[1px] border-gray-300'>
          <div className='hidden grid-cols-12 bg-zinc-200 px-6 py-3 font-sans text-xs tracking-widest text-gray-600 uppercase md:grid'>
            <div className='col-span-3'></div>
            <div className='col-span-4'>PRODUCT</div>
            <div className='col-span-2'>SIZE</div>
            <div className='col-span-2'>QTY</div>
            <div className='col-span-1 text-right'>PRICE</div>
          </div>

          {cart.cartItems.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-12 gap-4 border-b border-gray-300 px-4 py-6'
            >
              <div className='col-span-3 flex h-full w-full items-center justify-center'>
                <Link
                  href={`/products/${item.product.category.slug}/${item.product.subCategory?.slug}/${item.product.id}`}
                >
                  <Image
                    src={item.product.images?.[0]?.url ?? "/placeholder.png"}
                    alt={item.product.name}
                    layout='responsive'
                    width={180}
                    height={320}
                    className='h-auto max-w-[11rem] object-contain'
                  />
                </Link>
              </div>

              <div className='grid-row-1 col-span-9 grid items-start gap-2 md:grid-cols-9 md:gap-0 lg:items-start'>
                <div className='flex flex-col justify-start gap-3 text-[11px] md:col-span-4'>
                  <div className='flex flex-col'>
                    <p className='font-semibold tracking-widest'>
                      {item.product.name}
                    </p>
                    <p className='py-2 leading-5'>{item.product.description}</p>
                    <p className=''>
                      Color: {item.product.variants?.[0]?.color ?? "N/A"}
                    </p>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='flex items-center gap-2'>
                      <LuRefreshCcw className='text-xs' />
                      <span>Return Policy</span>
                    </p>
                    <p className='py-2'>
                      This item is returnable for a full refund within 28 days
                      from the date that the order was delivered to you.
                    </p>
                    {item.stock && (
                      <p className='mb-3 text-xs text-red-600'>
                        {item.stock > 0
                          ? item.stock <= 2
                            ? `Hurry! Only ${item.stock} left in this size.`
                            : `In stock: ${item.stock}`
                          : "Out of stock"}
                      </p>
                    )}
                  </div>
                </div>
                <SizeSelect
                  itemId={item.id}
                  currentSize={item.size}
                  sizes={item.product.variants.map((v) => v.size ?? "N/A")}
                />
                <QuantitySelect
                  itemId={item.id}
                  quantity={item.quantity}
                  stock={item?.stock}
                />
                {/* Price */}
                <p className='ml-auto w-full text-right text-xs md:col-span-1'>
                  ${formatPrice(item.product.price)}
                </p>
              </div>

              <div className='col-span-12 mt-3 flex justify-end text-xs text-gray-600'>
                <RemoveButton itemId={item.id} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className='w-full py-6 lg:w-[20rem]'>
        <PaymentSummary
          itemsPrice={cart.itemsPrice}
          taxPrice={cart.taxPrice}
          shippingPrice={cart.shippingPrice}
          totalPrice={cart.totalPrice}
        />
      </aside>
    </div>
  );
}
