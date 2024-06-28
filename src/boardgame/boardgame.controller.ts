import { Express } from 'express';
import { diskStorage } from 'multer';

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post('batch')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '../../uploads',
      }),
    }),
  )
  createBoardgameBatch(@UploadedFile() file: Express.Multer.File) {
    return this.boardgameService.createBoardgameBatch(file);
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
