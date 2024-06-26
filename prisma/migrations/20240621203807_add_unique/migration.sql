/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SleeveBrand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `SleeveType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SleeveBrand_name_key" ON "SleeveBrand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveType_type_key" ON "SleeveType"("type");
