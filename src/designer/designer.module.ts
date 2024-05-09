import { Module } from '@nestjs/common';

import { DesignerService } from './designer.service';

@Module({
  providers: [DesignerService],
  exports: [DesignerService],
})
export class DesignerModule {}
