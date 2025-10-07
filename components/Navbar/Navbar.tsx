export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const categories = await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });
  const carts = await prisma.cart.findMany({
    include: { cartItems: true },
  });

  const cartItemsCount = carts.reduce((sum, cart) => {
    return sum + cart.cartItems.reduce((s, ci) => s + ci.quantity, 0);
  }, 0);

  return (
    <NavbarClient categories={categories} cartItemsCount={cartItemsCount} />
  );
}
