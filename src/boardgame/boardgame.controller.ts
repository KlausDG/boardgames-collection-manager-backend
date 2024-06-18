import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { BoardgameService } from './boardgame.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

// @UseGuards(AuthGuard)
@Controller('boardgames')
export class BoardgameController {
  constructor(private boardgameService: BoardgameService) {}

  @Post()
  createBoardgame(@Body() dto: CreateBoardgameDto) {
    return this.boardgameService.createBoardgame(dto);
  }

  @Get()
  getBoardgames(@Query('filter') filter: 'basegame' | 'expansion') {
    return this.boardgameService.getBoardgames(filter);
  }

  @Get(':id')
  getBoardgameById(@Param('id', ParseIntPipe) boardgameId: number) {
    return this.boardgameService.getBoardgameById(boardgameId);
  }

  @Get('exists/:id')
  getBoardgameByBggId(@Param('id', ParseIntPipe) boardgameId: number) {
    return this.boardgameService.getBoardgameByBggId(boardgameId);
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
