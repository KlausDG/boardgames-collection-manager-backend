/*
  Warnings:

  - You are about to drop the column `availableAmount` on the `sleeves` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `sleeves` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sleeves" DROP COLUMN "availableAmount",
DROP COLUMN "totalAmount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
