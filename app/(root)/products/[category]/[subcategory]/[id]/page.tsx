export const dynamic = "force-dynamic";
import ProductDetailClient from "@/components/Products/ProductDetailClient";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
export type paramsType = Promise<{ id: string }>;

export default async function ProductDetailPage(props: { params: paramsType }) {
  const { id } = await props.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true, variants: true },
  });
  const user = await getServerSession(authOptions);
  
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} user={user} />;
}
