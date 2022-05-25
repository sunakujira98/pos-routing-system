/*
  Warnings:

  - You are about to drop the `orderDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orderDetails" DROP CONSTRAINT "orderDetails_product_id_fkey";

-- DropTable
DROP TABLE "orderDetails";

-- CreateTable
CREATE TABLE "order_details" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
