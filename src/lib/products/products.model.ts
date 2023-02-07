import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { IProduct as T } from './products.types';

export class ProductsRaw extends BaseRaw<T> {
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

export const ProductsModel = new ProductsRaw(
  db.collection('products'),
  db.collection('trash')
);
