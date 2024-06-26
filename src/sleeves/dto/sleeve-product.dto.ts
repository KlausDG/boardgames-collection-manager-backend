import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

import { SleeveCategories } from '@prisma/client';

export class SleeveProductDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  sizeId: number;

  @IsString()
  @IsEnum(SleeveCategories)
  @IsNotEmpty()
  category: SleeveCategories;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  sleevesPerPack: number;
}
