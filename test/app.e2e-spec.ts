import * as pactum from 'pactum';

import { AuthGuard } from '@/auth/guard';
import { CreateBoardgameDto, EditBoardgameDto } from '@/boardgame/dto';
import { CreateSleeveDto } from '@/sleeves/dto';
import { SleeveCategories } from '@/sleeves/types';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { MockAuthGuard } from './mocks';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  //describe('Auth', () => {})

  describe('Boardgames', () => {
    describe('Get empty boardgames', () => {
      it('should get boardgames', () => {
        return pactum
          .spec()
          .get('/boardgames')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create boardgame', () => {
      const dto: CreateBoardgameDto = {
        name: 'Boardgame',
        thumbnail: 'https://www.google.com',
        designers: ['Klaus', 'Dieter', 'Galm'],
      };

      it('should create a boardgame', () => {
        return pactum
          .spec()
          .post('/boardgames')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('boardgameId', 'id');
      });

      it('should throw if there is already a boardgame with the same required fields in the database', () => {
        return pactum
          .spec()
          .post('/boardgames')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(403);
      });

      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/boardgames')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(400);
      });
    });

    describe('Get boardgames', () => {
      it('should get all boardgames', () => {
        return pactum
          .spec()
          .get('/boardgames')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get boardgame by id', () => {
      it('should get boardgame by id', () => {
        return pactum
          .spec()
          .get('/boardgames/{id}')
          .withPathParams('id', '$S{boardgameId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{boardgameId}');
      });
    });
    describe('Edit boardgame', () => {
      const dto: EditBoardgameDto = {
        name: 'Boardgame 2',
      };

      it('should edit boardgame', () => {
        return pactum
          .spec()
          .patch('/boardgames/{id}')
          .withPathParams('id', '$S{boardgameId}')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains(dto.name);
      });
    });
    describe('Remove from collection', () => {
      it('should remove boardgame from collection', () => {
        return pactum
          .spec()
          .patch('/boardgames/remove/{id}')
          .withPathParams('id', '$S{boardgameId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });
  });

  describe('Sleeves', () => {
    describe('Get empty sleeves', () => {
      it('should get sleeves', () => {
        return pactum
          .spec()
          .get('/sleeves')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create sleeve', () => {
      const dto: CreateSleeveDto = {
        brand: 'Meeple Virus',
        type: 'Mini Euro',
        amount: 100,
        width: 50,
        height: 50,
        category: SleeveCategories.REGULAR,
      };

      it('should create a sleeve', () => {
        return pactum
          .spec()
          .post('/sleeves')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('sleeveId', 'id');
      });

      it('should throw if there is already a sleeve with the same required fields in the database', () => {
        return pactum
          .spec()
          .post('/sleeves')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(403);
      });

      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/sleeves')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(400);
      });
    });
  });
});
