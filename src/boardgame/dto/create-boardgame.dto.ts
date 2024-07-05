import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
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

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty()
  designers: string[];

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  yearPublished?: number;

  @IsString()
  @IsOptional()
  language?: string;

  @IsString()
  @IsNotEmpty()
  languageDependence: string;

  @IsNumber()
  @IsOptional()
  minPlayers?: number;

  @IsNumber()
  @IsOptional()
  maxPlayers?: number;

  @IsString()
  bestPlayerCount?: string;

  @IsNumber()
  @IsOptional()
  minPlaytime?: number;

  @IsNumber()
  @IsOptional()
  maxPlaytime?: number;

  @IsNumber()
  @IsOptional()
  purchasedPrice?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  bggRank?: number;

  @IsNumber()
  @IsNotEmpty()
  bggId: number;

  @IsString()
  @IsOptional()
  @IsUrl()
  bggLink?: string;

  @IsBoolean()
  @IsNotEmpty()
  isExpansion: boolean;

  @IsNumber()
  @IsOptional()
  isExpansionForBggId?: number;
}
