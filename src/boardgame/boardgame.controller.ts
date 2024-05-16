import { AuthGuard } from '@/auth/guard';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { BoardgameService } from './boardgame.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@UseGuards(AuthGuard)
@Controller('boardgames')
export class BoardgameController {
  constructor(private boardgameService: BoardgameService) {}

  @Post()
  createBoardgame(@Body() dto: CreateBoardgameDto) {
    return this.boardgameService.createBoardgame(dto);
  }

  @Get()
  getBoardgames() {
    return this.boardgameService.getBoardgames();
  }

  @Get(':id')
  getBoardgameById(@Param('id', ParseIntPipe) boardgameId: number) {
    return this.boardgameService.getBoardgameById(boardgameId);
  }

  @Patch(':id')
  editBoardgameById(
    @Param('id', ParseIntPipe) boardgameId: number,
    @Body() dto: EditBoardgameDto,
  ) {
    return this.boardgameService.editBoardgameById(boardgameId, dto);
  }

  @Patch('remove/:id')
  deleteBoardgameById(@Param('id', ParseIntPipe) boardgameId: number) {
    return this.boardgameService.deleteBoardgameById(boardgameId);
  }
}
