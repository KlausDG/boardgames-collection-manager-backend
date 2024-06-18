import { Controller, Get } from '@nestjs/common';

import { DesignerService } from './designer.service';

// @UseGuards(AuthGuard)
@Controller('designers')
export class DesignerController {
  constructor(private designerService: DesignerService) {}

  @Get()
  getDesigners() {
    return this.designerService.getDesigners();
  }
}
