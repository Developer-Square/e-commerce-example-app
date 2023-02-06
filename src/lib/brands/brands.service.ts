import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';
import type { BrandsRaw } from './brands.model';
import { BrandsModel } from './brands.model';
import type { IBrand, IBrandService } from './brands.types';

export class BrandService implements IBrandService {
  protected name = 'brand';

  private model: BrandsRaw = BrandsModel;

  async create(params: Pick<IBrand, 'description'>): Promise<IBrand | null> {
    const result = await this.model.insertOne(params);
    return this.model.findOneById(result.insertedId);
  }

  async update(
    brandId: string,
    updateBody: Pick<IBrand, 'description'>
  ): Promise<IBrand | null> {
    const query = { _id: brandId };
    const result = await this.model.updateOne(query, { $set: updateBody });
    return this.model.findOneById(result.upsertedId.toHexString());
  }

  async get(brandId: string): Promise<IBrand | null> {
    return this.model.findOneById(brandId);
  }

  async delete(brandId: string): Promise<void> {
    await this.model.removeById(brandId);
  }

  async list(
    { offset, count }: IPaginationOptions = { offset: 0, count: 50 },
    { sort, query }: IQueryOptions<IBrand> = { sort: {}, query: {} }
  ): Promise<IQueryResult<IBrand>> {
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
