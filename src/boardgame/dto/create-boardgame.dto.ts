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

  @IsNumber()
  @IsOptional()
  minPlayers?: number;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsNumber()
  @IsOptional()
  bestPlayers_amount?: number;

  @IsNumber()
  @IsOptional()
  minPlaying_time?: number;

  @IsNumber()
  @IsOptional()
  maxPlaying_time?: number;

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
