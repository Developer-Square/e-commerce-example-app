import type { IDBRecord } from '../definitions/IDBRecord';
import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';

export interface ICategory extends IDBRecord {
  name: string;
}

export interface ICategoryService {
  create(params: Pick<ICategory, 'name'>): Promise<ICategory | null>;
  update(
    categoryId: ICategory['_id'],
    updateBody: Pick<ICategory, 'name'>
  ): Promise<ICategory | null>;
  delete(categoryId: ICategory['_id']): Promise<void>;
  get(categoryId: ICategory['_id']): Promise<ICategory | null>;
  list(
    paginationOptions?: IPaginationOptions,
    queryOptions?: IQueryOptions<ICategory>
  ): Promise<IQueryResult<ICategory>>;
}
