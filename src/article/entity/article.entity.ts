export interface ArticleEntity {
  id: number;
  title: string;
  content: string;
  author: string;
  fixed: boolean;
  created_at: Date;
  updated_at: Date;
}