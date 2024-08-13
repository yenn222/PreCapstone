import { ArticleEntity } from '../entity/article.entity';
import { PickType } from '@nestjs/mapped-types';

/**
 * 게시글 생성 요청 DTO
 */
export class CreateArticleRequestDto extends PickType(ArticleEntity, ['title', 'content'] as const) { }