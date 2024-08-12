import { CreateArticleRequestDto } from 'src/article/dto/create-article.request.dto';
import { ArticleEntity } from 'src/article/entity/article.entity';

const articles: ArticleEntity[] = [];

const add = (dto: CreateArticleRequestDto): ArticleEntity => {
  const id: number = articles.length + 1;
  const article: ArticleEntity = {
    id,
    ...dto,
    author: '이혜현',
    fixed: false,
    created_at: new Date(),
    updated_at: null,
  };
  articles.push(article);
  return article;
};

const get = (id: number): ArticleEntity => {
  return articles.find(article => article.id === id);
};


const getAll = (): ArticleEntity[] => {
  return articles;
};

export const db = {
  add,
  get,
  getAll,
};