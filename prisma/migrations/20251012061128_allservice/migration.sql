/*
  Warnings:

  - You are about to drop the column `fromCity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `toCity` on the `Order` table. All the data in the column will be lost.
  - Added the required column `fromCityId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toCityId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_fromCity_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_toCity_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "fromCity",
DROP COLUMN "toCity",
ADD COLUMN     "fromCityId" TEXT NOT NULL,
ADD COLUMN     "toCityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fromCityId_fkey" FOREIGN KEY ("fromCityId") REFERENCES "AllService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_toCityId_fkey" FOREIGN KEY ("toCityId") REFERENCES "AllService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
