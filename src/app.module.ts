import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BoardgameModule } from './boardgame/boardgame.module';
import { DesignerModule } from './designer/designer.module';
import { BggModule } from './bgg/bgg.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    UserModule,
    PrismaModule,
    BoardgameModule,
    DesignerModule,
    BggModule,
  ],
})
export class AppModule {}
