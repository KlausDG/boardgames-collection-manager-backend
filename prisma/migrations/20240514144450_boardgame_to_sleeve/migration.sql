-- CreateTable
CREATE TABLE "_BoardgameToSleeve" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BoardgameToSleeve_AB_unique" ON "_BoardgameToSleeve"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardgameToSleeve_B_index" ON "_BoardgameToSleeve"("B");

-- AddForeignKey
ALTER TABLE "_BoardgameToSleeve" ADD CONSTRAINT "_BoardgameToSleeve_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToSleeve" ADD CONSTRAINT "_BoardgameToSleeve_B_fkey" FOREIGN KEY ("B") REFERENCES "Sleeve"("id") ON DELETE CASCADE ON UPDATE CASCADE;
