import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { BoardgameFilterKeys } from '../types';

export class BoardgameFilters {
  @IsOptional()
  @IsString()
  key?: BoardgameFilterKeys;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsBoolean()
  isLinked?: boolean;
}
