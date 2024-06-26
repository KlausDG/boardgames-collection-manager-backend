import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsNumber()
  @IsOptional()
  yearPublished?: number;

  @IsString()
  @IsOptional()
  language?: string;

  @IsNumber()
  @IsOptional()
  minPlayers?: number;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsString()
  @IsOptional()
  bestPlayerCount?: string;

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
  bggLink?: string;

  @IsString()
  @IsOptional()
  bggId?: number;

  @IsBoolean()
  @IsOptional()
  inCollection?: boolean;
}
