import { IsDate, IsDefined, IsNumber, IsString } from "class-validator";

/**
 * 게시글 엔티티
 * DB와 구조가 일치함
 */
export class ArticleEntity {
  @IsNumber({}, { message: '게시글 ID는 number이어야 합니다.' })
  id: number;

  @IsString({ message: '게시글 제목은 string이어야 합니다.' })
  @IsDefined({ message: '게시글 제목은 필수 입력값입니다.' })
  title: string;

  @IsString({ message: '게시글 내용은 string이어야 합니다.' })
  @IsDefined({ message: '게시글 내용은 필수 입력값입니다.' })
  content: string;

  @IsString({ message: '게시글 작성자는 string이어야 합니다.' })
  @IsDefined({ message: '게시글 작성자는 필수 입력값입니다.' })
  author: string;

  @IsString({ message: '게시글 작성자는 string이어야 합니다.' })
  fixed: boolean;

  @IsDate({ message: '게시글 작성일은 Date이어야 합니다.' })
  created_at: Date;

  @IsDate({ message: '게시글 수정일은 Date이어야 합니다.' })
  updated_at: Date;
}