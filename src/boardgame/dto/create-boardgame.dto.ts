import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateBoardgameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  designerName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  yearPublished?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber()
  @IsOptional()
  minPlayers?: number;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsNumber()
  @IsOptional()
  bestPlayerCount?: number;

  @IsNumber()
  @IsOptional()
  minPlaytime?: number;

  @IsNumber()
  @IsOptional()
  maxPlaytime?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  bggRank?: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  bggLink?: string;
}
