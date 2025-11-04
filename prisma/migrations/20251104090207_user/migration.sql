/*
  Warnings:

  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
