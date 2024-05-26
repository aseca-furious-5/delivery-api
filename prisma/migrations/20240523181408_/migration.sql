/*
  Warnings:

  - You are about to drop the `Delivery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_orderId_fkey";

-- DropTable
DROP TABLE "Delivery";

-- CreateTable
CREATE TABLE "DeliveryModel" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "deliveryStatus" "DeliveryStatus" NOT NULL,
    "deliveryArrivalDate" TIMESTAMP(3),

    CONSTRAINT "DeliveryModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryModel_orderId_key" ON "DeliveryModel"("orderId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "DeliveryModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
