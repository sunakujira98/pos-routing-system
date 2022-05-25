-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "shipmentsId" INTEGER;

-- CreateTable
CREATE TABLE "shipments" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "truck_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment_details" (
    "id" SERIAL NOT NULL,
    "shipment_id" INTEGER NOT NULL,
    "distance_from_store" DOUBLE PRECISION NOT NULL,
    "total_weight" DOUBLE PRECISION NOT NULL,
    "sequence" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipment_details_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_shipmentsId_fkey" FOREIGN KEY ("shipmentsId") REFERENCES "shipments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_details" ADD CONSTRAINT "shipment_details_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
