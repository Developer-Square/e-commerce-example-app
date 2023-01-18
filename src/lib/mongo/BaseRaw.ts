/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import type {
  BulkWriteOptions,
  Collection,
  CountDocumentsOptions,
  DeleteOptions,
  DeleteResult,
  Document,
  Filter,
  FindCursor,
  FindOneAndUpdateOptions,
  FindOptions,
  IndexDescription,
  InsertManyResult,
  InsertOneOptions,
  InsertOneResult,
  ModifyResult,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
  WithId,
} from 'mongodb';
import { ObjectId } from 'mongodb';

import logger from '@/config/logger';
import type { DBRecordDeleted, IDBRecord } from '@/lib/definitions/IDBRecord';

import { setUpdatedAt } from './utils/setUpdatedAt';

// [extracted from @types/mongo] TypeScript Omit (Exclude to be specific) does not work for objects with an "any" indexed type, and breaks discriminated unions
type EnhancedOmit<T, K> = string | number extends keyof T
  ? T // T has indexed type e.g. { _id: string; [k: string]: any; } or it is "any"
  : T extends any
  ? Pick<T, Exclude<keyof T, K>> // discriminated unions
  : never;

// [extracted from @types/mongo]
type ExtractIdType<TSchema> = TSchema extends { _id: infer U } // user has defined a type for _id
  ? {} extends U
    ? Exclude<U, {}>
    : unknown extends U
    ? ObjectId
    : U
  : ObjectId;

export type ModelOptionalId<T> = EnhancedOmit<T, '_id'> & {
  _id?: ExtractIdType<T>;
};
// InsertionModel forces both _id, _createdAt and _updatedAt to be optional, regardless of how they are declared in T
export type InsertionModel<T> = EnhancedOmit<
  ModelOptionalId<T>,
  '_updatedAt' | '_createdAt'
> & {
  _updatedAt?: Date;
  _createdAt?: Date;
};

export interface IBaseRaw<T extends Document> {
  col: Collection<T>;
}

const baseName = 'ECommerceApp_';

type DefaultFields<Base> = Record<keyof Base, 1> | Record<keyof Base, 0> | void;
type ResultFields<Base, Defaults> = Defaults extends void
  ? Base
  : Defaults[keyof Defaults] extends 1
  ? Pick<Defaults, keyof Defaults>
  : Omit<Defaults, keyof Defaults>;

export class BaseRaw<T extends Document, C extends DefaultFields<T> = undefined>
  implements IBaseRaw<T>
{
  public readonly defaultFields!: C;

  protected name: string;

  private preventSetUpdatedAt: boolean;

  private preventSetCreatedAt: boolean;

  public readonly trash?: Collection<DBRecordDeleted<T>>;

  constructor(
    public readonly col: Collection<T>,
    trash?: Collection<T>,
    options?: { preventSetUpdatedAt?: boolean; preventSetCreatedAt?: boolean }
  ) {
    this.name = this.col.collectionName.replace(baseName, '');
    this.trash = trash as unknown as Collection<DBRecordDeleted<T>>;

    const indexes = this.modelIndexes();
    if (Array.isArray(indexes)) {
      this.col.createIndexes(indexes).catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(`Error creating indexes for ${this.name}`, e);
      });
    }

    this.preventSetUpdatedAt = options?.preventSetUpdatedAt ?? false;
    this.preventSetCreatedAt = options?.preventSetCreatedAt ?? false;
  }

  // eslint-disable-next-line class-methods-use-this
  protected modelIndexes(): IndexDescription[] | void {
    // noop
  }

  private doNotMixInclusionAndExclusionFields(
    options: FindOptions<T> = {}
  ): FindOptions<T> {
    const optionsDef = this.ensureDefaultFields(options);
    if (optionsDef?.projection === undefined) {
      return optionsDef;
    }

    const projection: Record<string, any> = optionsDef?.projection;
    const keys = Object.keys(projection);
    const removeKeys = keys.filter((key) => projection[key] === 0);
    if (keys.length > removeKeys.length) {
      removeKeys.forEach((key) => delete projection[key]);
    }

    return {
      ...optionsDef,
      projection,
    };
  }

  private ensureDefaultFields(
    options?: undefined
  ): C extends void ? undefined : FindOptions<T>;

  private ensureDefaultFields(options: FindOptions<T>): FindOptions<T>;

  private ensureDefaultFields<P extends Document>(
    options: FindOptions<P>
  ): FindOptions<P>;

  private ensureDefaultFields<P extends Document>(
    options?: any
  ): FindOptions<P> | undefined | FindOptions<T> {
    if (this.defaultFields === undefined) {
      return options;
    }

    const { fields: deprecatedFields, projection, ...rest } = options || {};

    if (deprecatedFields) {
      logger.warn("Using 'fields' in models is deprecated.");
    }

    const fields = { ...deprecatedFields, ...projection };

    return {
      projection: this.defaultFields,
      ...(fields && Object.values(fields).length && { projection: fields }),
      ...rest,
    };
  }

  public findOneAndUpdate(
    query: Filter<T>,
    update: UpdateFilter<T>,
    options?: FindOneAndUpdateOptions
  ): Promise<ModifyResult<T>> {
    return this.col.findOneAndUpdate(
      query,
      update,
      options as FindOneAndUpdateOptions
    );
  }

  async findOneById(
    _id: string,
    options?: FindOptions<T> | undefined
  ): Promise<T | null>;

  async findOneById<P extends Document>(
    _id: string,
    options: FindOptions<P extends T ? T : P>
  ): Promise<P | null>;

  async findOneById<P>(
    _id: string,
    options?: any
  ): Promise<WithId<T> | P | null> {
    const query = { _id } as unknown as Filter<T>;
    const optionsDef = this.doNotMixInclusionAndExclusionFields(options);
    return this.col.findOne(query, optionsDef);
  }

  async findOne(
    query?: Filter<T> | string,
    options?: undefined
  ): Promise<T | null>;

  async findOne(
    query: Filter<T> | string,
    options: FindOptions<T>
  ): Promise<T | null>;

  async findOne<P extends Document>(
    query: Filter<T> | string,
    options: FindOptions<P extends T ? T : P>
  ): Promise<P | null>;

  async findOne<P>(
    query: Filter<T> | string = {},
    options?: any
  ): Promise<WithId<T> | WithId<P> | null> {
    const q =
      typeof query === 'string'
        ? ({ _id: query } as unknown as Filter<T>)
        : query;

    const optionsDef = this.doNotMixInclusionAndExclusionFields(options);
    return this.col.findOne(q, optionsDef);
  }

  find(query?: Filter<T>): FindCursor<ResultFields<T, C>>;

  find(
    query: Filter<T>,
    options: FindOptions<T>
  ): FindCursor<ResultFields<T, C>>;

  find<P extends Document = T>(
    query: Filter<T>,
    options: FindOptions<P extends T ? T : P>
  ): FindCursor<WithId<P>>;

  find<P>(
    query: Filter<T> | undefined = {},
    options?: any
  ): FindCursor<WithId<P>> | FindCursor<WithId<T>> {
    const optionsDef = this.doNotMixInclusionAndExclusionFields(options);
    return this.col.find(query, optionsDef);
  }

  countDocuments(): Promise<number>;

  countDocuments(query: Filter<T>): Promise<number>;

  countDocuments(
    query: Filter<T>,
    options: CountDocumentsOptions
  ): Promise<number>;

  countDocuments(
    query: Filter<T> | undefined = {},
    options?: CountDocumentsOptions
  ): Promise<number> {
    return this.col.countDocuments(query, options as CountDocumentsOptions);
  }

  updateOne(
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
    options?: UpdateOptions
  ): Promise<UpdateResult> {
    this.setUpdatedAt(update);
    return this.col.updateOne(filter, update, options as UpdateOptions);
  }

  updateMany(
    filter: Filter<T>,
    update: UpdateFilter<T> | Partial<T>,
    options?: UpdateOptions
  ): Promise<Document | UpdateResult> {
    this.setUpdatedAt(update);
    return this.col.updateMany(filter, update, options as UpdateOptions);
  }

  insertMany(
    docs: Array<InsertionModel<T>>,
    options?: BulkWriteOptions
  ): Promise<InsertManyResult<T>> {
    // eslint-disable-next-line no-param-reassign
    docs = docs.map((doc) => {
      if (!doc._id || typeof doc._id !== 'string') {
        const oid = new ObjectId();
        return { _id: oid.toHexString(), ...doc };
      }
      this.setUpdatedAt(doc);
      this.setCreatedAt(doc);
      return doc;
    });

    // TODO reavaluate following type casting
    return this.col.insertMany(
      docs as unknown as Array<OptionalUnlessRequiredId<T>>,
      options as BulkWriteOptions
    );
  }

  insertOne(
    doc: InsertionModel<T>,
    options?: InsertOneOptions
  ): Promise<InsertOneResult<T>> {
    if (!doc._id || typeof doc._id !== 'string') {
      const oid = new ObjectId();
      // eslint-disable-next-line no-param-reassign
      doc = { _id: oid.toHexString(), ...doc };
    }

    this.setUpdatedAt(doc);
    this.setCreatedAt(doc);

    // TODO reavaluate following type casting
    return this.col.insertOne(
      doc as unknown as OptionalUnlessRequiredId<T>,
      options as InsertOneOptions
    );
  }

  removeById(_id: string): Promise<DeleteResult> {
    return this.deleteOne({ _id } as unknown as Filter<T>);
  }

  async deleteOne(
    filter: Filter<T>,
    options?: DeleteOptions & { bypassDocumentValidation?: boolean }
  ): Promise<DeleteResult> {
    if (!this.trash) {
      return this.col.deleteOne(
        filter,
        options as DeleteOptions & { bypassDocumentValidation?: boolean }
      );
    }

    const doc = (await this.findOne(filter)) as unknown as
      | (IDBRecord & T)
      | undefined;

    if (doc) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, ...record } = doc;

      const trash = {
        ...record,

        _deletedAt: new Date(),
        __collection__: this.name,
      } as DBRecordDeleted<T>;

      // since the operation is not atomic, we need to make sure that the record is not already deleted/inserted
      await this.trash?.updateOne(
        { _id } as Filter<DBRecordDeleted<T>>,
        { $set: trash },
        {
          upsert: true,
        }
      );
    }

    return this.col.deleteOne(
      filter,
      options as DeleteOptions & { bypassDocumentValidation?: boolean }
    );
  }

  async deleteMany(
    filter: Filter<T>,
    options?: DeleteOptions
  ): Promise<DeleteResult> {
    if (!this.trash) {
      return this.col.deleteMany(filter, options as DeleteOptions);
    }

    const cursor = this.find(filter);

    const ids: string[] = [];

    cursor.forEach((doc) => {
      const { _id, ...record } = doc as unknown as IDBRecord & T;
      const trash = {
        ...record,

        _deletedAt: new Date(),
        __collection__: this.name,
      } as DBRecordDeleted<T>;

      ids.push(_id);

      // since the operation is not atomic, we need to make sure that the record is not already deleted/inserted
      this.trash?.updateOne(
        { _id } as Filter<DBRecordDeleted<T>>,
        { $set: trash },
        {
          upsert: true,
        }
      );
    });

    return this.col.deleteMany(
      { _id: { $in: ids } } as unknown as Filter<T>,
      options as DeleteOptions
    );
  }

  // Trash
  trashFind<P extends DBRecordDeleted<T>>(
    query: Filter<DBRecordDeleted<T>>,
    options: FindOptions<P extends DBRecordDeleted<T> ? DBRecordDeleted<T> : P>
  ): FindCursor<WithId<DBRecordDeleted<T>>> | undefined {
    if (!this.trash) {
      return undefined;
    }
    const { trash } = this;

    return trash.find(
      {
        __collection__: this.name,
        ...query,
      },
      options
    );
  }

  trashFindOneById(_id: string): Promise<DBRecordDeleted<T> | null>;

  trashFindOneById(
    _id: string,
    options: FindOptions<DBRecordDeleted<T>>
  ): Promise<DBRecordDeleted<DBRecordDeleted<T>> | null>;

  trashFindOneById<P extends Document>(
    _id: string,
    options: FindOptions<P extends DBRecordDeleted<T> ? DBRecordDeleted<T> : P>
  ): Promise<P | null>;

  async trashFindOneById<P extends DBRecordDeleted<T>>(
    _id: string,
    options?: FindOptions<P extends DBRecordDeleted<T> ? DBRecordDeleted<T> : P>
  ): Promise<DBRecordDeleted<P> | null> {
    const query = {
      _id,
      __collection__: this.name,
    } as Filter<DBRecordDeleted<T>>;

    if (!this.trash) {
      return null;
    }
    const { trash } = this;

    return trash.findOne(query, options);
  }

  private setUpdatedAt(record: UpdateFilter<T> | InsertionModel<T>): void {
    if (this.preventSetUpdatedAt) {
      return;
    }
    setUpdatedAt(record);
  }

  private setCreatedAt(record: InsertionModel<T>): void {
    if (this.preventSetCreatedAt) {
      return;
    }
    // eslint-disable-next-line no-param-reassign
    record._createdAt = new Date();
  }

  trashFindDeletedAfter(
    deletedAt: Date
  ): FindCursor<WithId<DBRecordDeleted<T>>>;

  trashFindDeletedAfter(
    deletedAt: Date,
    query: Filter<DBRecordDeleted<T>>,
    options: FindOptions<DBRecordDeleted<T>>
  ): FindCursor<WithId<DBRecordDeleted<T>>>;

  trashFindDeletedAfter(
    deletedAt: Date,
    query?: Filter<DBRecordDeleted<T>>,
    options?: FindOptions<DBRecordDeleted<T>>
  ): FindCursor<WithId<DBRecordDeleted<T>>> {
    const q = {
      __collection__: this.name,
      _deletedAt: {
        $gt: deletedAt,
      },
      ...query,
    } as Filter<DBRecordDeleted<T>>;

    const { trash } = this;

    if (!trash) {
      throw new Error('Trash is not enabled for this collection');
    }

    return trash.find(q, options as any);
  }
}
