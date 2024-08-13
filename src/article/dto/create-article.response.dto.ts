import { PickType } from "@nestjs/mapped-types";
import { ArticleEntity } from "../entity/article.entity";

/**
 * 게시글 생성 응답 DTO
 * update_at가 제외되어 있음
 */
export class CreateArticleResponseDto extends PickType(ArticleEntity, ['id', 'title', 'content', 'author', 'created_at'] as const) { }