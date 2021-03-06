import type { Filter, SchemaMember, Sort } from 'mongodb';

export interface IPaginationOptions {
  offset: number;
  count: number;
}

export interface IQueryOptions<T> {
  sort?: Sort;
  query?: Filter<T>;
  fields?: SchemaMember<T, number | boolean>;
}

export interface IQueryResult<T> {
  documents: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}
