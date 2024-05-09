/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `designers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "designers_name_key" ON "designers"("name");
