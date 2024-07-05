import fs from 'fs';
import path from 'path';

import { PrismaClient } from '@prisma/client';

import {
  convertCommaToDot,
  convertToArray,
  roundDecimal,
  stringToNumber,
} from '../src/utils/helpers';

const prisma = new PrismaClient();

async function main() {
  const seedDataPath = path.join(__dirname, 'standalones.json');
  // const seedDataPath = path.join(__dirname, 'expansions.json');
  const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));

  for (const item of seedData) {
    const designersStructure = item.designers.map((name: string) => {
      return {
        create: { name },
        where: { name },
      };
    });

    const mechanicsStructure = item.mechanics.map((name: string) => {
      return {
        create: { name },
        where: { name },
      };
    });

    const publisherStructure = {
      create: { name: item.publisher },
      where: { name: item.publisher },
    };

    const payload: any = {
      name: item.name,
      bggId: item.bggId,
      bggLink: item.bggLink,
      language: item.language,
      thumbnail: item.thumbnail,
      designers: { connectOrCreate: designersStructure },
      publisher: { connectOrCreate: publisherStructure },
      mechanics: { connectOrCreate: mechanicsStructure },
      description: item.description,
      yearPublished: item.yearPublished,
      minPlayers: item.minPlayers,
      maxPlayers: item.maxPlayers,
      minPlaytime: item.minPlaytime,
      maxPlaytime: item.maxPlaytime,
      isExpansion: item.isExpansion,
      purchasedPrice: stringToNumber(convertCommaToDot(item.purchasedPrice)),
      languageDependence: item.languageDependence,
      weight: roundDecimal(item.weight),
      bestPlayerCount: convertToArray(item.bestPlayerCount),
      bggRank: item.bggRank,
      category: item.category,
    };

    if (!!item.isExpansionForBggId) {
      payload.isExpansionFor = { connect: { bggId: item.isExpansionForBggId } };
    }

    await prisma.boardgame.create({
      data: payload,
    });
  }
}

main();
