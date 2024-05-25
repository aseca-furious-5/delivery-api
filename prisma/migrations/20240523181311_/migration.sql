/*
  Warnings:

  - You are about to drop the column `deliverySentDate` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `wasDelivered` on the `Delivery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliveryStatus` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('PENDING', 'ON_THE_WAY', 'DELIVERED');

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "deliverySentDate",
DROP COLUMN "wasDelivered",
ADD COLUMN     "deliveryStatus" "DeliveryStatus" NOT NULL,
ALTER COLUMN "deliveryArrivalDate" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_orderId_key" ON "Delivery"("orderId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
