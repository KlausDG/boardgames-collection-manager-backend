import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { SleeveCategories } from '../types';

export class EditSleeveDto {
  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsEnum(SleeveCategories)
  @IsOptional()
  category?: SleeveCategories;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsOptional()
  height?: number;
}
