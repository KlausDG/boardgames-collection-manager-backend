/*
  Warnings:

  - You are about to drop the column `type` on the `SleeveSize` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `SleeveSize` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `SleeveSize` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SleeveSize_type_key";

-- AlterTable
ALTER TABLE "SleeveSize" DROP COLUMN "type",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SleeveSize_name_key" ON "SleeveSize"("name");
