import type { Filter, SchemaMember, Sort } from 'mongodb';

export interface IPaginationOptions {
  page?: number;
  limit?: number;
}

export interface IQueryOptions<T> {
  sort?: Sort;
  query?: Filter<T>;
  fields?: SchemaMember<T, number | boolean>;
}

export interface IListOptions {
  page?: IPaginationOptions['page'];
  limit?: IPaginationOptions['limit'];
  sortBy?: string;
  priceRange?: string;
}

export interface IQueryResult<T> {
  documents: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalCount: number;
}
