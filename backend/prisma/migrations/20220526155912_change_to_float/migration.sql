/*
  Warnings:

  - You are about to alter the column `weight` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - You are about to alter the column `distance_from_store` on the `shipment_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.
  - You are about to alter the column `total_weight` on the `shipment_details` table. The data in that column could be lost. The data in that column will be cast from `Decimal(5,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "shipment_details" ALTER COLUMN "distance_from_store" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "total_weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "distance_from_previous_origin" SET DATA TYPE DECIMAL(65,30);
