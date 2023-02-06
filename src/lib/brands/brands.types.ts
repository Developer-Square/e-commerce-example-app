import type { IDBRecord } from '../definitions/IDBRecord';
import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';

export interface IBrand extends IDBRecord {
  description: string;
}

export interface IBrandService {
  create(params: Pick<IBrand, 'description' | '_id'>): Promise<IBrand | null>;
  update(
    brandId: IBrand['_id'],
    updateBody: Pick<IBrand, 'description'>
  ): Promise<IBrand | null>;
  delete(brandId: IBrand['_id']): Promise<void>;
  get(brandId: IBrand['_id']): Promise<IBrand | null>;
  list(
    paginationOptions?: IPaginationOptions,
    queryOptions?: IQueryOptions<IBrand>
  ): Promise<IQueryResult<IBrand>>;
}
