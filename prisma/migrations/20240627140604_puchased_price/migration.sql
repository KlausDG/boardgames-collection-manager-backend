/*
  Warnings:

  - You are about to drop the column `purchasedValue` on the `boardgames` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "purchasedValue",
ADD COLUMN     "purchasedPrice" DOUBLE PRECISION;
