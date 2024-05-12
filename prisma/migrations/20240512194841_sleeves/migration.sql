/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `boardgames` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `designers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoardgameCategories" AS ENUM ('BASE', 'EXPANSION', 'ADDON', 'EXTRA', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "SleeveCategories" AS ENUM ('SLIM', 'REGULAR', 'PREMIUM', 'ULTRA_PREMIUM');

-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "category" "BoardgameCategories" NOT NULL DEFAULT 'BASE',
ADD COLUMN     "purchasedValue" DOUBLE PRECISION,
ALTER COLUMN "minPlayers" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "designers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "sleeve_brands" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sleeve_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleeve_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "Height" DOUBLE PRECISION NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sleeve_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleeves" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "SleeveCategories" NOT NULL DEFAULT 'REGULAR',
    "availableAmount" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "sleeveTypeId" INTEGER NOT NULL,
    "sleeveBrandId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sleeves_pkey" PRIMARY KEY ("sleeveTypeId","sleeveBrandId","id")
);

-- CreateTable
CREATE TABLE "boardgame_sleeves" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "sleeveId" INTEGER NOT NULL,

    CONSTRAINT "boardgame_sleeves_pkey" PRIMARY KEY ("boardgameId","sleeveId")
);

-- CreateIndex
CREATE UNIQUE INDEX "sleeve_brands_name_key" ON "sleeve_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sleeves_id_key" ON "sleeves"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sleeves_userId_key" ON "sleeves"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "boardgames_userId_key" ON "boardgames"("userId");

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_sleeveTypeId_fkey" FOREIGN KEY ("sleeveTypeId") REFERENCES "sleeve_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_sleeveBrandId_fkey" FOREIGN KEY ("sleeveBrandId") REFERENCES "sleeve_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardgame_sleeves" ADD CONSTRAINT "boardgame_sleeves_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardgame_sleeves" ADD CONSTRAINT "boardgame_sleeves_sleeveId_fkey" FOREIGN KEY ("sleeveId") REFERENCES "sleeves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
