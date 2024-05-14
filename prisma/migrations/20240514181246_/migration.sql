/*
  Warnings:

  - You are about to drop the column `consumedAmount` on the `SleeveToBoardgame` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SleeveToBoardgame" DROP COLUMN "consumedAmount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;
