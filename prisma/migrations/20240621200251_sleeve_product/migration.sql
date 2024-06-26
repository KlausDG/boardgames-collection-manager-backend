/*
  Warnings:

  - You are about to drop the column `brandId` on the `SleeveStock` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `SleeveStock` table. All the data in the column will be lost.
  - You are about to drop the column `packs` on the `SleeveStock` table. All the data in the column will be lost.
  - You are about to drop the column `sleeveTypeId` on the `SleeveStock` table. All the data in the column will be lost.
  - You are about to drop the column `sleevesPerPack` on the `SleeveStock` table. All the data in the column will be lost.
  - Added the required column `productId` to the `SleeveStock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SleeveStock" DROP CONSTRAINT "SleeveStock_brandId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveStock" DROP CONSTRAINT "SleeveStock_sleeveTypeId_fkey";

-- DropIndex
DROP INDEX "SleeveType_type_key";

-- AlterTable
ALTER TABLE "SleeveStock" DROP COLUMN "brandId",
DROP COLUMN "category",
DROP COLUMN "packs",
DROP COLUMN "sleeveTypeId",
DROP COLUMN "sleevesPerPack",
ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SleeveProduct" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "sleevesPerPack" INTEGER NOT NULL,

    CONSTRAINT "SleeveProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SleeveStock" ADD CONSTRAINT "SleeveStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "SleeveProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveProduct" ADD CONSTRAINT "SleeveProduct_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "SleeveBrand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveProduct" ADD CONSTRAINT "SleeveProduct_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "SleeveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
