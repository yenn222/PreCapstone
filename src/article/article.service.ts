import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateArticleRequestDto } from './dto/create-article.request.dto';
import { db } from '../database/arrayDB';
import { GetArticleResponseDto } from './dto/get-article.response.dto';
import { ArticleEntity } from './entity/article.entity';
import { GetArticleListResponseDto } from './dto/get-article-list.response.dto';
import { CreateArticleResponseDto } from './dto/create-article.response.dto';
import { UpdateArticleResponseDto } from './dto/update-article.response.dto';
import { UpdateArticleRequestDto } from './dto/update-article.request.dto';

@Injectable()
export class ArticleService {
  /**
   * 게시글을 생성합니다.
   * 
   * @param author 게시글 작성자
   * @param dto 게시글 생성 요청 데이터
   * @returns 생성된 게시글의 정보
  */
  create(author: string, dto: CreateArticleRequestDto): CreateArticleResponseDto {
    const articleEntity: ArticleEntity = db.add(author, dto);
    const articleResponseDto: CreateArticleResponseDto = {
      id: articleEntity.id,
      title: articleEntity.title,
      content: articleEntity.content,
      author: articleEntity.author,
      created_at: articleEntity.created_at,
    }
    return articleResponseDto;
  }

  /**
   * 게시글을 조회합니다.
   * 
   * @param id 조회할 게시글의 ID
   * @returns 조회된 게시글의 정보
   * @throws NotFoundException 게시글이 존재하지 않을 때
  */
  getbyId(id: number): GetArticleResponseDto {
    const articleEntity: ArticleEntity = db.findById(id);
    if (!articleEntity) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    const articleResponseDto: GetArticleResponseDto = {
      id: articleEntity.id,
      title: articleEntity.title,
      content: articleEntity.content,
      author: articleEntity.author,
      created_at: articleEntity.created_at,
      updated_at: articleEntity.updated_at,
    }
    return articleResponseDto;
  }

  /**
   * 모든 게시글을 조회합니다.
   * 
   * @returns 모든 게시글의 정보
   * @throws NotFoundException 게시글이 존재하지 않을 때
  */
  getAll(): GetArticleListResponseDto[] {
    const allArticles = db.getAll();
    if (allArticles.length <= 0) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    return allArticles.map((articleEntity) => {
      const dto: GetArticleListResponseDto = {
        id: articleEntity.id,
        title: articleEntity.title,
        author: articleEntity.author,
        fixed: articleEntity.fixed,
        created_at: articleEntity.created_at,
        updated_at: articleEntity.updated_at,
      }
      return dto;
    });
  }

  /**
   * 페이지 범위에 해당하는 게시글을 조회합니다.
   * 
   * @param page 조회할 페이지
   * @param perPage 페이지 당 게시글 수
   * @returns 페이지 범위에 해당하는 게시글의 정보
   * @throws NotFoundException 게시글이 존재하지 않을 때
   * @throws UnprocessableEntityException 페이지 범위를 초과했을 때
  */
  getFromPage(page: number, perPage: number): GetArticleListResponseDto[] {
    const allArticles: ArticleEntity[] = db.getAll();
    if (allArticles.length <= 0) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    const start = (page - 1) * perPage;
    const end = start + perPage;
    if (start > allArticles.length) {
      throw new UnprocessableEntityException('페이지 범위를 초과했습니다.');
    }

    const articles = allArticles.slice(start, end);
    return articles.map((articleEntity) => {
      const dto: GetArticleListResponseDto = {
        id: articleEntity.id,
        title: articleEntity.title,
        author: articleEntity.author,
        fixed: articleEntity.fixed,
        created_at: articleEntity.created_at,
        updated_at: articleEntity.updated_at,
      }
      return dto;
    });
  }

  /**
   * 게시글의 마지막 페이지를 조회합니다.
   * 
   * @param perPage 페이지 당 게시글 수
   * @returns 게시글의 마지막 페이지 번호
   */
  getLastPage(perPage: number): number {
    const allArticles: ArticleEntity[] = db.getAll();
    if (allArticles.length <= 0) {
      return 0;
    }
    return Math.ceil(allArticles.length / perPage);
  }

  /**
   * 게시글을 수정합니다.
   * 
   * @param id 수정할 게시글의 ID
   * @param dto 수정할 게시글의 정보
   * @returns 수정된 게시글의 정보
   * @throws NotFoundException 게시글이 존재하지 않을 때
  */
  update(id: number, dto: UpdateArticleRequestDto): UpdateArticleResponseDto {
    const articleEntity = db.update(id, dto);
    if (!articleEntity) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    const articleResponseDto: UpdateArticleResponseDto = {
      id: articleEntity.id,
      title: articleEntity.title,
      content: articleEntity.content,
      author: articleEntity.author,
      updated_at: articleEntity.updated_at,
    }
    return articleResponseDto;
  }

  /**
   * 게시글을 삭제합니다.
   * 
   * @param id 삭제할 게시글의 ID
   * @throws NotFoundException 게시글이 존재하지 않을 때
  */
  delete(id: number): void {
    const articleEntity: ArticleEntity = db.remove(id);
    if (!articleEntity) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
  }
}