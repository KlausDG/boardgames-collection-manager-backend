/*
  Warnings:

  - Added the required column `packs` to the `SleeveStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleevesPerPack` to the `SleeveStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SleeveStock" ADD COLUMN     "packs" INTEGER NOT NULL,
ADD COLUMN     "sleevesPerPack" INTEGER NOT NULL;
