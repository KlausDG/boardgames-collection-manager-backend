import { IsNotEmpty, IsNumber } from 'class-validator';

export class AssignSleeveToBoardgameDto {
  @IsNumber()
  @IsNotEmpty()
  boardgameId: number;

  @IsNumber()
  @IsNotEmpty()
  sleeveId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
