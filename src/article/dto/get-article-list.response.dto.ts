import { PickType } from "@nestjs/mapped-types";
import { ArticleEntity } from "../entity/article.entity";

/**
 * 게시글 다건 조회 응답 DTO
 * content가 제외되어 있음
 */
export class GetArticleListResponseDto extends PickType(ArticleEntity, ['id', 'title', 'author', 'fixed', 'created_at', 'updated_at'] as const) { }