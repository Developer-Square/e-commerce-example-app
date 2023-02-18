import useSWR from 'swr';

import type { IQueryResult } from '../definitions/query';
import { getKey } from '../swr';
import type { IProduct } from './products.types';

const useProducts = (
  query?: string | string[][] | Record<string, string> | URLSearchParams
) => useSWR<IQueryResult<IProduct>>(getKey('/api/products', query));
const useProductById = (id: string) => useSWR<IProduct>(`/api/products/${id}`);

export { useProductById, useProducts };
