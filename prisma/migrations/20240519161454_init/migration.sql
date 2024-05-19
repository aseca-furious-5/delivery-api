-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "deliverySentDate" TIMESTAMP(3) NOT NULL,
    "deliveryArrivalDate" TIMESTAMP(3) NOT NULL,
    "wasDelivered" BOOLEAN NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);
