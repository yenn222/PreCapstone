import { plainToClass } from 'class-transformer';
import { CreateArticleRequestDto } from 'src/article/dto/create-article.request.dto';
import { UpdateArticleRequestDto } from 'src/article/dto/update-article.request.dto';
import { ArticleEntity } from 'src/article/entity/article.entity';

const articles: ArticleEntity[] = [];

const add = (author: string, dto: CreateArticleRequestDto): ArticleEntity => {
  const id: number = articles.length + 1;
  const article: ArticleEntity = plainToClass(ArticleEntity, {
    id,
    ...dto,
    author,
    fixed: false,
    created_at: new Date(),
    updated_at: null,
  });
  articles.push(article);
  return article;
};

const findById = (id: number): ArticleEntity => {
  if (articles.length <= 0 || id < 1 || id > articles.length) {
    return null;
  }
  return articles.find(article => article.id === id);
};

const update = (id: number, dto: UpdateArticleRequestDto): ArticleEntity => {
  const article: ArticleEntity = findById(id);
  if (!article) {
    return null;
  }
  article.title = dto.title;
  article.content = dto.content;
  article.updated_at = new Date();
  return article;
};

const getAll = (): ArticleEntity[] => {
  return articles;
};

const dummyInit = () => {
  for (let i = 1; i < 24; i++) {
    add(`이혜현`, {
      title: `테스트 제목${i}`,
      content: `테스트 게시글 내용입니다.${i}`,
    });
  }
}

export const db = {
  add,
  findById,
  update,
  getAll,
  dummyInit,
};