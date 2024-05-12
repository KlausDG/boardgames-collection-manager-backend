/*
  Warnings:

  - You are about to drop the column `designerId` on the `boardgames` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "boardgames" DROP CONSTRAINT "boardgames_designerId_fkey";

-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "designerId";

-- CreateTable
CREATE TABLE "_BoardgameToDesigner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardgameToDesigner_AB_unique" ON "_BoardgameToDesigner"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardgameToDesigner_B_index" ON "_BoardgameToDesigner"("B");

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_B_fkey" FOREIGN KEY ("B") REFERENCES "designers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
