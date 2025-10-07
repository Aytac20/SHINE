"use server";

import { AddressDataProps, createNewAddressServer } from "@/lib/actions/address.actions";
import { toggleFavoriteServer } from "@/lib/actions/products.actions";


export async function toggleFavoriteAction(productId: string) {
  return toggleFavoriteServer(productId);
}

export async function createNewAddressAction(values: AddressDataProps) {
  return createNewAddressServer(values); 
}
