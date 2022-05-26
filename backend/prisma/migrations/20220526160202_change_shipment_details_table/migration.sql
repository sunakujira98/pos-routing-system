/*
  Warnings:

  - You are about to alter the column `distance_from_previous_origin` on the `shipment_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "shipment_details" ALTER COLUMN "distance_from_store" DROP NOT NULL,
ALTER COLUMN "distance_from_previous_origin" SET DATA TYPE DOUBLE PRECISION;
