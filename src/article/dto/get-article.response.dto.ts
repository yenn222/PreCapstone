import { PickType } from "@nestjs/mapped-types";
import { ArticleEntity } from "../entity/article.entity";

/**
 * 게시글 단건 조회 응답 DTO
 * fixed가 제외되어 있음
 */
export class GetArticleResponseDto extends PickType(ArticleEntity, ['id', 'title', 'content', 'author', 'created_at', 'updated_at'] as const) { }