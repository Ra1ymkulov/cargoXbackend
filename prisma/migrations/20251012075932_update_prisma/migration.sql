/*
  Warnings:

  - You are about to drop the column `serviceType` on the `Order` table. All the data in the column will be lost.
  - Added the required column `serviceTypeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "serviceType",
ADD COLUMN     "serviceTypeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_serviceTypeId_fkey" FOREIGN KEY ("serviceTypeId") REFERENCES "ServiceType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
