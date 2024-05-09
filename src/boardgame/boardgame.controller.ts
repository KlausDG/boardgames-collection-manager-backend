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

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BoardgameService } from './boardgame.service';
import { CreateBoardgameDto, EditBoardgameDto } from './dto';

@UseGuards(JwtGuard)
@Controller('boardgames')
export class BoardgameController {
  constructor(private boardgameService: BoardgameService) {}

  @Post()
  createBoardgame(
    @GetUser('id') userId: number,
    @Body() dto: CreateBoardgameDto,
  ) {
    return this.boardgameService.createBoardgame(userId, dto);
  }

  @Get()
  getBoardgames(@GetUser('id') userId: number) {
    return this.boardgameService.getBoardgames(userId);
  }

  @Get(':id')
  getBoardgameById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) boardgameId: number,
  ) {
    return this.boardgameService.getBoardgameById(userId, boardgameId);
  }

  @Patch(':id')
  editBoardgameById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) boardgameId: number,
    @Body() dto: EditBoardgameDto,
  ) {
    return this.boardgameService.editBoardgameById(userId, boardgameId, dto);
  }

  @Patch('remove/:id')
  deleteBoardgameById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) boardgameId: number,
  ) {
    return this.boardgameService.deleteBoardgameById(userId, boardgameId);
  }
}
