/*
  Warnings:

  - You are about to drop the column `brand` on the `SleeveStock` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `SleeveStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SleeveStock" DROP COLUMN "brand",
ADD COLUMN     "brandId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SleeveBrand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SleeveBrand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SleeveStock" ADD CONSTRAINT "SleeveStock_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "SleeveBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
