import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { IBrand as T } from './brands.types';

export class BrandsRaw extends BaseRaw<T> {}

export const BrandsModel = new BrandsRaw(
  db.collection('brands'),
  db.collection('trash')
);
