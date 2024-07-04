/*
  Warnings:

  - You are about to drop the column `mechanics` on the `boardgames` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "mechanics";

-- CreateTable
CREATE TABLE "mechanics" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "mechanics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardgameToMechanics" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mechanics_name_key" ON "mechanics"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BoardgameToMechanics_AB_unique" ON "_BoardgameToMechanics"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardgameToMechanics_B_index" ON "_BoardgameToMechanics"("B");

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToMechanics" ADD CONSTRAINT "_BoardgameToMechanics_B_fkey" FOREIGN KEY ("B") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
