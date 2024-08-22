import { Body, Controller, Get, HttpStatus, Param, Post, Res, ParseIntPipe, Query, Patch, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Response } from 'express';
import { GetArticleResponseDto } from './dto/get-article.response.dto';
import { GetArticleListResponseDto } from './dto/get-article-list.response.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';
import { UpdateArticleResponseDto } from './dto/update-article.response.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  create(@Body() createArticleDto: CreateArticleRequestDto, @Res() res: Response) {
    const article: CreateArticleResponseDto = this.articleService.create('이혜현', createArticleDto); // author는 하드코딩

    res.status(HttpStatus.CREATED).json(article);
  }

  @Get()
  getFromPage(@Query('page', new ParseIntPipe()) page: number, @Query('perpage', new ParseIntPipe()) perPage: number, @Res() res: Response) {
    const articles: GetArticleListResponseDto[] = this.articleService.getFromPage(page, perPage);

    res.status(HttpStatus.OK).json({
      maxPage: this.articleService.getLastPage(perPage),
      articles: articles
    });
  }

  @Get(':id')
  getbyId(@Param('id', new ParseIntPipe()) articleid: number, @Res() res: Response) {
    const article: GetArticleResponseDto = this.articleService.getbyId(articleid);

    res.status(HttpStatus.OK).json(article);
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) articleid: number, @Body() updateArticleDto: UpdateArticleRequestDto, @Res() res: Response) {
    const article: UpdateArticleResponseDto = this.articleService.update(articleid, updateArticleDto);

    res.status(HttpStatus.OK).json(article);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) articleid: number, @Res() res: Response) {
    this.articleService.delete(articleid);
    res.status(HttpStatus.OK).send();
  }
}
