export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import NavbarClient from "./NavbarClient";

import { getUser } from "@/lib/actions/cart.actions";

export default async function Navbar() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });
  const user = await getUser();
  const carts = await prisma.cart.findMany({
    where: { userId: user?.id },
    include: { cartItems: true },
  });

  const cartItemsCount = carts.reduce((sum, cart) => {
    return sum + cart.cartItems.reduce((s, ci) => s + ci.quantity, 0);
  }, 0);

  return (
    <NavbarClient categories={categories} cartItemsCount={cartItemsCount} />
  );
}
