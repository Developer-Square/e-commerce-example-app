import useSWR from 'swr';

import type { IQueryResult } from '../definitions/query';
import { getKey } from '../swr';
import type { IUserWithoutPassword } from './users.types';

const useUsers = (
  query?: string | string[][] | Record<string, string> | URLSearchParams
) => useSWR<IQueryResult<IUserWithoutPassword>>(getKey('/api/users', query));
const useUserById = (id: string) =>
  useSWR<IUserWithoutPassword>(`/api/users/${id}`);

export { useUserById, useUsers };
