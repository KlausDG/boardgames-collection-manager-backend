/*
  Warnings:

  - You are about to drop the column `sleeveTypeId` on the `BoardgameSleeveRequirement` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `SleeveProduct` table. All the data in the column will be lost.
  - You are about to drop the `SleeveType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sleeveSizeId` to the `BoardgameSleeveRequirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeId` to the `SleeveProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoardgameSleeveRequirement" DROP CONSTRAINT "BoardgameSleeveRequirement_sleeveTypeId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveProduct" DROP CONSTRAINT "SleeveProduct_typeId_fkey";

-- AlterTable
ALTER TABLE "BoardgameSleeveRequirement" DROP COLUMN "sleeveTypeId",
ADD COLUMN     "sleeveSizeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SleeveProduct" DROP COLUMN "typeId",
ADD COLUMN     "sizeId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SleeveType";

-- CreateTable
CREATE TABLE "SleeveSize" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SleeveSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SleeveSize_type_key" ON "SleeveSize"("type");

-- AddForeignKey
ALTER TABLE "SleeveProduct" ADD CONSTRAINT "SleeveProduct_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "SleeveSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameSleeveRequirement" ADD CONSTRAINT "BoardgameSleeveRequirement_sleeveSizeId_fkey" FOREIGN KEY ("sleeveSizeId") REFERENCES "SleeveSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
