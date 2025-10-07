export const dynamic = "force-dynamic";

import { getMyCart } from "@/lib/actions/cart.actions";
import { redirect } from "next/navigation";

import ShippingAddressForm from "./shipping-address-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Shipping Address",
};
const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.cartItems.length === 0) redirect("/cart");
  return (
    <div className='relative'>
      <ShippingAddressForm />
    </div>
  );
};

export default ShippingAddressPage;
