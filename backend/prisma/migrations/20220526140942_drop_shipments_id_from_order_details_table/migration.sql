/*
  Warnings:

  - You are about to drop the column `shipmentsId` on the `order_details` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `shipments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_shipmentsId_fkey";

-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "shipmentsId";

-- AlterTable
ALTER TABLE "shipments" DROP COLUMN "order_date",
ADD COLUMN     "shipment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
