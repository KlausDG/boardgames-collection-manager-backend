/*
  Warnings:

  - You are about to drop the `Sleeve` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleeveToBoardgame` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SleeveToBoardgame" DROP CONSTRAINT "SleeveToBoardgame_boardgameId_fkey";

-- DropForeignKey
ALTER TABLE "SleeveToBoardgame" DROP CONSTRAINT "SleeveToBoardgame_sleeveId_fkey";

-- DropTable
DROP TABLE "Sleeve";

-- DropTable
DROP TABLE "SleeveToBoardgame";

-- CreateTable
CREATE TABLE "SleeveType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SleeveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeveStock" (
    "id" SERIAL NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "SleeveCategories" NOT NULL,
    "amount" INTEGER NOT NULL,
    "sleeveTypeId" INTEGER NOT NULL,

    CONSTRAINT "SleeveStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoardgameSleeveRequirement" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "sleeveTypeId" INTEGER NOT NULL,

    CONSTRAINT "BoardgameSleeveRequirement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SleeveStock" ADD CONSTRAINT "SleeveStock_sleeveTypeId_fkey" FOREIGN KEY ("sleeveTypeId") REFERENCES "SleeveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameSleeveRequirement" ADD CONSTRAINT "BoardgameSleeveRequirement_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoardgameSleeveRequirement" ADD CONSTRAINT "BoardgameSleeveRequirement_sleeveTypeId_fkey" FOREIGN KEY ("sleeveTypeId") REFERENCES "SleeveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
