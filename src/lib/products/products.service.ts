import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';
import type { ProductsRaw } from './products.model';
import { ProductsModel } from './products.model';
import type { IProduct, IProductLean, IProductService } from './products.types';

export class ProductService implements IProductService {
  protected name = 'product';

  private model: ProductsRaw = ProductsModel;

  async create(params: IProductLean): Promise<IProduct | null> {
    const result = await this.model.insertOne(params);
    return this.model.findOneById(result.insertedId);
  }

  async update(
    productId: string,
    updateBody: IProductLean
  ): Promise<IProduct | null> {
    const query = { _id: productId };
    const result = await this.model.updateOne(query, { $set: updateBody });
    return this.model.findOneById(result.upsertedId.toHexString());
  }

  async get(productId: string): Promise<IProduct | null> {
    return this.model.findOneById(productId);
  }

  async delete(productId: string): Promise<void> {
    await this.model.removeById(productId);
  }

  async list(
    { offset, count }: IPaginationOptions = { offset: 0, count: 50 },
    { sort, query }: IQueryOptions<IProduct> = { sort: {}, query: {} }
  ): Promise<IQueryResult<IProduct>> {
    const totalCount = await this.model.countDocuments({ ...query });
    const paginationCursor = this.model.find(
      { ...query },
      {
        ...(sort && { sort }),
        limit: count,
        skip: offset,
      }
    );
    return {
      documents: await paginationCursor.toArray(),
      page: offset,
      limit: count,
      totalCount,
      totalPages: Math.ceil(totalCount / count),
    };
  }
}

const Products = new ProductService();
export default Products;
