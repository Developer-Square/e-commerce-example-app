import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { ICategory as T } from './categories.types';

export class CategoriesRaw extends BaseRaw<T> {
  // eslint-disable-next-line class-methods-use-this
  protected modelIndexes(): IndexDescription[] {
    return [
      {
        key: { name: 1 },
        unique: true,
      },
    ];
  }
}

export const CategoriesModel = new CategoriesRaw(
  db.collection('categories'),
  db.collection('trash')
);
