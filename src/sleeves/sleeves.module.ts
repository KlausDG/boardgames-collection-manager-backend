import { Module } from '@nestjs/common';
import { SleevesController } from './sleeves.controller';
import { SleevesService } from './sleeves.service';

@Module({
  controllers: [SleevesController],
  providers: [SleevesService]
})
export class SleevesModule {}
