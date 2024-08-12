import { Injectable } from '@nestjs/common';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { db } from '../database/arrayDB';
import { GetArticleResponseDto } from './dto/get-article.response.dto';
import { ArticleEntity } from './entity/article.entity';
import { GetArticlesResponseDto } from './dto/get-articles.response.dto';

@Injectable()
export class ArticleService {
  createArticle(dto: CreateArticleRequestDto) {
    return db.add(dto);
  }

  getArticle(id: number): GetArticleResponseDto {
    const articleEntity: ArticleEntity = db.get(id);
    const articleResponseDto: GetArticleResponseDto = {
      id: articleEntity.id,
      title: articleEntity.title,
      content: articleEntity.content,
      author: articleEntity.author,
      created_at: articleEntity.created_at,
      updated_at: articleEntity.updated_at,
    };
    return articleResponseDto;
  }

  getAllArticles(): GetArticlesResponseDto[] {
    const allArticles = db.getAll();
    return allArticles.map((articleEntity) => {
      return {
        id: articleEntity.id,
        title: articleEntity.title,
        auther: articleEntity.author,
        fixed: articleEntity.fixed,
        created_at: articleEntity.created_at,
        updated_at: articleEntity.updated_at,
      };
    });
  }
}