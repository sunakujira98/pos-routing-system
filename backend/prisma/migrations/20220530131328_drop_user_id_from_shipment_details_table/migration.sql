/*
  Warnings:

  - You are about to drop the column `usersId` on the `shipment_details` table. All the data in the column will be lost.
  - You are about to drop the column `shipment_date` on the `users` table. All the data in the column will be lost.
  - Added the required column `token` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shipment_details" DROP CONSTRAINT "shipment_details_usersId_fkey";

-- AlterTable
ALTER TABLE "shipment_details" DROP COLUMN "usersId";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "shipment_date",
ADD COLUMN     "token" TEXT NOT NULL;
