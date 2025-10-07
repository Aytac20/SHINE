/*
  Warnings:

  - Added the required column `itemsPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "itemsPrice" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "shippingPrice" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "taxPrice" DECIMAL(12,2) NOT NULL;
