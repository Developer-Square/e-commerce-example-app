import type { IDBRecord } from '../definitions/IDBRecord';
import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';

export interface IProduct extends IDBRecord {
  name: string;
  price: number;
  productInfo: string;
  materialUsed: string;
  images: string[];
  category: string;
  brand?: string;
  size?: string;
}

export type IProductLean = Omit<IProduct, '_id' | '_createdAt' | '_updatedAt'>;

export interface IProductService {
  create(params: IProductLean): Promise<IProduct | null>;
  update(
    productId: IProduct['_id'],
    updateBody: IProductLean
  ): Promise<IProduct | null>;
  delete(productId: IProduct['_id']): Promise<void>;
  get(productId: IProduct['_id']): Promise<IProduct>;
  list(
    paginationOptions?: IPaginationOptions,
    queryOptions?: IQueryOptions<IProduct>
  ): Promise<IQueryResult<IProduct>>;
}
