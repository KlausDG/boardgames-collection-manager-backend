/*
  Warnings:

  - You are about to drop the `Designer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `boardgames` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designerId` to the `boardgames` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "bestPlayers_amount" INTEGER,
ADD COLUMN     "bggLink" TEXT,
ADD COLUMN     "bggRank" INTEGER,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "designerId" INTEGER NOT NULL,
ADD COLUMN     "maxPlayers" INTEGER,
ADD COLUMN     "maxPlaying_time" INTEGER,
ADD COLUMN     "minPlayers" INTEGER,
ADD COLUMN     "minPlaying_time" INTEGER,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "yearPublished" TEXT;

-- DropTable
DROP TABLE "Designer";

-- CreateTable
CREATE TABLE "designers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "designers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boardgames_name_key" ON "boardgames"("name");

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "designers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
