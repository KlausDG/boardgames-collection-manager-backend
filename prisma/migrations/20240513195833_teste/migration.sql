/*
  Warnings:

  - The `category` column on the `Sleeve` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Sleeve" DROP COLUMN "category",
ADD COLUMN     "category" "SleeveCategories" DEFAULT 'REGULAR';

-- CreateIndex
CREATE UNIQUE INDEX "Sleeve_brand_type_category_key" ON "Sleeve"("brand", "type", "category");
