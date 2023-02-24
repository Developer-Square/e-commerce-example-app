import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import applySchemaValidation from '../mongo/utils/applySchemaValidation';
import { productSchema } from './products.schema';
import type { IProduct as T } from './products.types';

const productCollectionName = 'products';

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
  db.collection(productCollectionName),
  db.collection('trash')
);

// eslint-disable-next-line func-names
(async function(){
  await applySchemaValidation(db, productSchema, productCollectionName);
})();
