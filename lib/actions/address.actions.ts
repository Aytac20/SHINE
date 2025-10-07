export const dynamic = "force-dynamic";

import prisma from "../prisma";
import { getUser } from "./cart.actions";
export type AddressDataProps = {
  country: string;
  fullName: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  phone: string;
};
export async function createNewAddressServer(values: AddressDataProps) {
  try {
    const user = await getUser();

    const existingAddress = await prisma.address.findFirst({
      where: {
        userId: user.id,
        country: values.country,
        fullName: values.fullName,
        streetAddress: values.streetAddress,
        city: values.city,
        postalCode: values.postalCode,
        phone: values.phone,
      },
    });

    if (existingAddress) {
      return existingAddress; // təkrar create eləmirik
    }

    return await prisma.address.create({
      data: {
        ...values,
        user: { connect: { id: user.id } },
      },
    });
  } catch (error) {
    console.error("Failed to create address", error);
    throw error;
  }
}
