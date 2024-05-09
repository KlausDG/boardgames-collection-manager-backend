import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditBoardgameDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

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
  bggLink?: string;
}
