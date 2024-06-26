import { IsNotEmpty, IsNumber } from 'class-validator';

export class SleevePacksDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  packs: number;
}
