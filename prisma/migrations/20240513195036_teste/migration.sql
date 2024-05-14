/*
  Warnings:

  - You are about to drop the `boardgame_sleeves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sleeve_brands` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sleeve_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sleeves` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "boardgame_sleeves" DROP CONSTRAINT "boardgame_sleeves_boardgameId_fkey";

-- DropForeignKey
ALTER TABLE "boardgame_sleeves" DROP CONSTRAINT "boardgame_sleeves_sleeveId_fkey";

-- DropForeignKey
ALTER TABLE "sleeves" DROP CONSTRAINT "sleeves_sleeveBrandId_fkey";

-- DropForeignKey
ALTER TABLE "sleeves" DROP CONSTRAINT "sleeves_sleeveTypeId_fkey";

-- DropForeignKey
ALTER TABLE "sleeves" DROP CONSTRAINT "sleeves_userId_fkey";

-- DropTable
DROP TABLE "boardgame_sleeves";

-- DropTable
DROP TABLE "sleeve_brands";

-- DropTable
DROP TABLE "sleeve_types";

-- DropTable
DROP TABLE "sleeves";

-- CreateTable
CREATE TABLE "Sleeve" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,
    "amountOwned" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Sleeve_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sleeve_brand_type_category_key" ON "Sleeve"("brand", "type", "category");

-- AddForeignKey
ALTER TABLE "Sleeve" ADD CONSTRAINT "Sleeve_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
