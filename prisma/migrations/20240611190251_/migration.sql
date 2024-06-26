/*
  Warnings:

  - Added the required column `bggId` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "bggId" INTEGER NOT NULL;
