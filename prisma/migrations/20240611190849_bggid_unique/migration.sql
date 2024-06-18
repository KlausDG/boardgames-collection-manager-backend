/*
  Warnings:

  - A unique constraint covering the columns `[bggId]` on the table `boardgames` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "boardgames_bggId_key" ON "boardgames"("bggId");
