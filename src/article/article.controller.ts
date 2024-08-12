import { Body, Controller, Get, HttpStatus, Param, Post, Res, ParseIntPipe } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Response } from 'express';
import { GetArticleResponseDto } from './dto/get-article.response.dto';
import { GetArticlesResponseDto } from './dto/get-articles.response.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  createArticle(@Body() createArticleDto, @Res() res: Response) {
    const article: CreateArticleResponseDto = this.articleService.createArticle(createArticleDto);
    res.status(HttpStatus.CREATED).json(article);
  }

  @Get()
  getAllArticles(@Res() res: Response) {
    const articles: GetArticlesResponseDto[] = this.articleService.getAllArticles();
    res.status(HttpStatus.OK).json({ articles: articles });
  }

  @Get(':id')
  getArticle(@Param('id', new ParseIntPipe()) articleid: number, @Res() res: Response) {
    const article: GetArticleResponseDto = this.articleService.getArticle(articleid);
    res.status(HttpStatus.OK).json(article);
  }
}
