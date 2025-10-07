import { formatPrice } from "@/lib/utils";
import Link from "next/link";
interface PaymentSummaryProps {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}
const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}) => {
  return (
    <>
      <h3 className='mb-4 text-lg'>Payment Summary</h3>

      {/* Summary Items */}
      <div className='space-y-3 text-xs'>
        <div className='flex justify-between'>
          <span>Order Subtotal</span>
          <span>${formatPrice(itemsPrice)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Est. Taxes/Duties* </span>
          <span>${formatPrice(taxPrice)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Est. Shipping </span>
          <span>${formatPrice(shippingPrice)}</span>
        </div>

        {/* Order Total */}
        <div className='flex justify-between border-b border-gray-300 py-2 font-semibold'>
          <span>Order Total</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>

        {/* Pay Today */}
        <div className='flex justify-between border-b border-gray-300 py-2 font-semibold'>
          <span>Est. Pay Today</span>
          <span>${formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href='/shipping-address'
        className='mt-4 block w-full bg-black py-3 text-center text-xs tracking-widest text-white uppercase'
      >
        Procced to Checkout
      </Link>
    </>
  );
};

export default PaymentSummary;
