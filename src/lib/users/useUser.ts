import Router from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import type { IUser } from './users.types';

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser, error } = useSWR<IUser>('/api/user');

  useEffect(() => {
    if (!redirectTo || !user) return;
    if (redirectIfFound && user) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, mutateUser, isLoading: !error && !user, isError: error };
}
