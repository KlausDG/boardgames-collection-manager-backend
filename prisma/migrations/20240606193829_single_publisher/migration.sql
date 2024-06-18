/*
  Warnings:

  - You are about to drop the `_BoardgameToPublisher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `publisherId` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BoardgameToPublisher" DROP CONSTRAINT "_BoardgameToPublisher_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardgameToPublisher" DROP CONSTRAINT "_BoardgameToPublisher_B_fkey";

-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "publisherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BoardgameToPublisher";

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
