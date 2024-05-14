/*
  Warnings:

  - You are about to drop the `_BoardgameToSleeve` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardgameToSleeve" DROP CONSTRAINT "_BoardgameToSleeve_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToSleeve" DROP CONSTRAINT "_BoardgameToSleeve_B_fkey";

-- DropTable
DROP TABLE "_BoardgameToSleeve";

-- CreateTable
CREATE TABLE "SleeveToBoardgame" (
    "id" SERIAL NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "sleeveId" INTEGER NOT NULL,
    "consumedAmount" INTEGER NOT NULL,

    CONSTRAINT "SleeveToBoardgame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SleeveToBoardgame_boardgameId_sleeveId_key" ON "SleeveToBoardgame"("boardgameId", "sleeveId");

-- AddForeignKey
ALTER TABLE "SleeveToBoardgame" ADD CONSTRAINT "SleeveToBoardgame_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleeveToBoardgame" ADD CONSTRAINT "SleeveToBoardgame_sleeveId_fkey" FOREIGN KEY ("sleeveId") REFERENCES "Sleeve"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
