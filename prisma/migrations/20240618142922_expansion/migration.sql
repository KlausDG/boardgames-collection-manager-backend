-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "isExpansion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isExpansionForBggId" INTEGER;

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_isExpansionForBggId_fkey" FOREIGN KEY ("isExpansionForBggId") REFERENCES "boardgames"("bggId") ON DELETE SET NULL ON UPDATE CASCADE;
