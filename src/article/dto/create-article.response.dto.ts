export interface CreateArticleResponseDto {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: Date;
}