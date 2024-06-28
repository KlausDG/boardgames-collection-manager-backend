/*
  Warnings:

  - The values [BASE] on the enum `BoardgameCategories` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `languageDependence` to the `boardgames` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LanguageDependences" AS ENUM ('NO', 'LOW', 'MODERATE', 'HIGH');

-- AlterEnum
BEGIN;
CREATE TYPE "BoardgameCategories_new" AS ENUM ('STANDALONE', 'EXPANSION', 'ADDON', 'EXTRA', 'ACCESSORY');
ALTER TABLE "boardgames" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "boardgames" ALTER COLUMN "category" TYPE "BoardgameCategories_new" USING ("category"::text::"BoardgameCategories_new");
ALTER TYPE "BoardgameCategories" RENAME TO "BoardgameCategories_old";
ALTER TYPE "BoardgameCategories_new" RENAME TO "BoardgameCategories";
DROP TYPE "BoardgameCategories_old";
ALTER TABLE "boardgames" ALTER COLUMN "category" SET DEFAULT 'STANDALONE';
COMMIT;

-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "languageDependence" "LanguageDependences" NOT NULL,
ADD COLUMN     "mechanics" TEXT[],
ADD COLUMN     "recPlayerCount" INTEGER[],
ALTER COLUMN "category" SET DEFAULT 'STANDALONE';
