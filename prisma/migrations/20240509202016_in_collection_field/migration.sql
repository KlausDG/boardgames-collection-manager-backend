-- AlterTable
ALTER TABLE "boardgames" ADD COLUMN     "inCollection" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "description" DROP NOT NULL;
