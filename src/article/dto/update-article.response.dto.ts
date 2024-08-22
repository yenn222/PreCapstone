import { PickType } from '@nestjs/mapped-types';
import { ArticleEntity } from '../entity/article.entity';


export class UpdateArticleResponseDto extends PickType(ArticleEntity, ['id', 'title', 'content', 'author', 'updated_at']) { }