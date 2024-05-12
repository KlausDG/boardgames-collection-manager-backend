import * as pactum from 'pactum';
import { CreateBoardgameDto, EditBoardgameDto } from 'src/boardgame/dto';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'klausdgalm@hotmail.com',
      password: '123',
    };

    describe('Signup', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')

          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('should throw if no body is provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')

          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Klaus',
        };

        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName);
      });
    });
  });

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
          .stores('boardgameId', 'id')
          .inspect();
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
});
