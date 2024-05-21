-- CreateTable
CREATE TABLE "publishers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoardgameToPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "publishers_name_key" ON "publishers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BoardgameToPublisher_AB_unique" ON "_BoardgameToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardgameToPublisher_B_index" ON "_BoardgameToPublisher"("B");

-- AddForeignKey
ALTER TABLE "_BoardgameToPublisher" ADD CONSTRAINT "_BoardgameToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToPublisher" ADD CONSTRAINT "_BoardgameToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "publishers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
