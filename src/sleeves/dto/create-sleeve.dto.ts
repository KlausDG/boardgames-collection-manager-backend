import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { SleeveCategories } from '../types';

export class CreateSleeveDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  sleeveTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  packs: number;

  @IsNumber()
  @IsNotEmpty()
  sleevesPerPack: number;

  @IsEnum(SleeveCategories)
  @IsNotEmpty()
  category: SleeveCategories;
}
