import type { Sort } from 'mongodb';

export default function formatSort(sortBy?: string) {
  const sort: Sort = {};
  if (sortBy) {
    sortBy.split(',').forEach((sortOption: string) => {
      const [key, order] = sortOption.split(':');
      sort[key as string] = order === 'desc' ? -1 : 1;
    });
  }
  return sort;
}
