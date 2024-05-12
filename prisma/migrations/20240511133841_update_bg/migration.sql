/*
  Warnings:

  - You are about to drop the column `bestPlayers_amount` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `maxPlaying_time` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the column `minPlaying_time` on the `boardgames` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "bestPlayers_amount",
DROP COLUMN "maxPlaying_time",
DROP COLUMN "minPlaying_time",
ADD COLUMN     "bestPlayerCount" INTEGER,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "maxPlaytime" INTEGER,
ADD COLUMN     "minPlaytime" INTEGER;
