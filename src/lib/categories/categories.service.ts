import type {
  IPaginationOptions,
  IQueryOptions,
  IQueryResult,
} from '../definitions/query';
import type { CategoriesRaw } from './categories.model';
import { CategoriesModel } from './categories.model';
import type { ICategory, ICategoryService } from './categories.types';

export class CategoryService implements ICategoryService {
  protected name = 'category';

  private model: CategoriesRaw = CategoriesModel;

  async create(
    params: Pick<ICategory, 'description'>
  ): Promise<ICategory | null> {
    const result = await this.model.insertOne(params);
    return this.model.findOneById(result.insertedId);
  }

  async update(
    categoryId: string,
    updateBody: Pick<ICategory, 'description'>
  ): Promise<ICategory | null> {
    const query = { _id: categoryId };
    const result = await this.model.updateOne(query, { $set: updateBody });
    return this.model.findOneById(result.upsertedId.toHexString());
  }

  async get(categoryId: string): Promise<ICategory | null> {
    return this.model.findOneById(categoryId);
  }

  async delete(categoryId: string): Promise<void> {
    await this.model.removeById(categoryId);
  }

  async list(
    { offset, count }: IPaginationOptions = { offset: 0, count: 50 },
    { sort, query }: IQueryOptions<ICategory> = { sort: {}, query: {} }
  ): Promise<IQueryResult<ICategory>> {
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
