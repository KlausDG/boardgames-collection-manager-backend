-- CreateEnum
CREATE TYPE "BoardgameCategories" AS ENUM ('BASE', 'EXPANSION', 'ADDON', 'EXTRA', 'ACCESSORY');

-- CreateEnum
CREATE TYPE "SleeveCategories" AS ENUM ('SLIM', 'REGULAR', 'PREMIUM', 'ULTRA_PREMIUM');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boardgames" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT,
    "yearPublished" TEXT,
    "language" TEXT,
    "minPlayers" INTEGER DEFAULT 1,
    "maxPlayers" INTEGER,
    "bestPlayerCount" INTEGER,
    "minPlaytime" INTEGER,
    "maxPlaytime" INTEGER,
    "weight" DOUBLE PRECISION,
    "bggRank" INTEGER,
    "bggLink" TEXT,
    "inCollection" BOOLEAN NOT NULL DEFAULT true,
    "category" "BoardgameCategories" NOT NULL DEFAULT 'BASE',
    "purchasedValue" DOUBLE PRECISION,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "boardgames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "designers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleeve_brands" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sleeve_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleeve_types" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sleeve_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sleeves" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "SleeveCategories" NOT NULL DEFAULT 'REGULAR',
    "availableAmount" INTEGER NOT NULL DEFAULT 0,
    "totalAmount" INTEGER NOT NULL DEFAULT 0,
    "sleeveTypeId" INTEGER NOT NULL,
    "sleeveBrandId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "sleeves_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boardgame_sleeves" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "boardgameId" INTEGER NOT NULL,
    "sleeveId" INTEGER NOT NULL,

    CONSTRAINT "boardgame_sleeves_pkey" PRIMARY KEY ("boardgameId","sleeveId")
);

-- CreateTable
CREATE TABLE "_BoardgameToDesigner" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "boardgames_name_key" ON "boardgames"("name");

-- CreateIndex
CREATE UNIQUE INDEX "boardgames_userId_key" ON "boardgames"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "designers_name_key" ON "designers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sleeve_brands_name_key" ON "sleeve_brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sleeve_types_name_key" ON "sleeve_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sleeves_userId_key" ON "sleeves"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BoardgameToDesigner_AB_unique" ON "_BoardgameToDesigner"("A", "B");

-- CreateIndex
CREATE INDEX "_BoardgameToDesigner_B_index" ON "_BoardgameToDesigner"("B");

-- AddForeignKey
ALTER TABLE "boardgames" ADD CONSTRAINT "boardgames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_sleeveTypeId_fkey" FOREIGN KEY ("sleeveTypeId") REFERENCES "sleeve_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_sleeveBrandId_fkey" FOREIGN KEY ("sleeveBrandId") REFERENCES "sleeve_brands"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sleeves" ADD CONSTRAINT "sleeves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardgame_sleeves" ADD CONSTRAINT "boardgame_sleeves_boardgameId_fkey" FOREIGN KEY ("boardgameId") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boardgame_sleeves" ADD CONSTRAINT "boardgame_sleeves_sleeveId_fkey" FOREIGN KEY ("sleeveId") REFERENCES "sleeves"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_A_fkey" FOREIGN KEY ("A") REFERENCES "boardgames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardgameToDesigner" ADD CONSTRAINT "_BoardgameToDesigner_B_fkey" FOREIGN KEY ("B") REFERENCES "designers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
