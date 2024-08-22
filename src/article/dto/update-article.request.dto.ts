import { PickType } from "@nestjs/mapped-types";
import { CreateArticleRequestDto } from "./create-article.request.dto";

/**
 * 게시글 수정 요청 DTO
 */
export class UpdateArticleRequestDto extends PickType(CreateArticleRequestDto, ['title', 'content']) { }