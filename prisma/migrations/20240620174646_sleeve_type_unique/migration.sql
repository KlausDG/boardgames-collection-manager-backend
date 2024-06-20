/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `SleeveType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SleeveType_type_key" ON "SleeveType"("type");
