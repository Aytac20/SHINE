import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

export const cartItemSchema = z.object({
  productId: z.string().uuid(),
  qty: z.number().int().min(1),
  name: z.string().min(1, "Name is required"),
  size: z.string().optional(),
  color: z.string().optional(),
  price: currency,
  image: z.string().min(1, "Image is required"),
});
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});