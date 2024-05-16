/*
  Warnings:

  - You are about to drop the column `userId` on the `Sleeve` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `boardgames` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sleeve" DROP CONSTRAINT "Sleeve_userId_fkey";

-- DropForeignKey
ALTER TABLE "boardgames" DROP CONSTRAINT "boardgames_userId_fkey";

-- AlterTable
ALTER TABLE "Sleeve" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "boardgames" DROP COLUMN "userId";

-- DropTable
DROP TABLE "users";
