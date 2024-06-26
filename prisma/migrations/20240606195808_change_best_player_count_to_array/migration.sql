/*
  Warnings:

  - The `bestPlayerCount` column on the `boardgames` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "bestPlayerCount",
ADD COLUMN     "bestPlayerCount" INTEGER[];
