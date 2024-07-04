import { Controller, Get } from '@nestjs/common';

import { MechanicsService } from './mechanics.service';

@Controller('mechanics')
export class MechanicsController {
  constructor(private mechanicsService: MechanicsService) {}

  @Get()
  getMechanics() {
    return this.mechanicsService.getMechanics();
  }
}
