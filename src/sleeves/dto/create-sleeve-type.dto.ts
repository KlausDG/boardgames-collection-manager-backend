import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSleeveTypeDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  height: number;
}
