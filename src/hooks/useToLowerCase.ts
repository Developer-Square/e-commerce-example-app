import { useCallback } from 'react';

export const useToLowerCase = (): ((word: string) => string) => {
  return useCallback((word) => {
    return word.replace(/\s+/g, '-').toLowerCase();
  }, []);
};
