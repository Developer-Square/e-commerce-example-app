import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { ICategory as T } from './categories.types';

export class CategoriesRaw extends BaseRaw<T> {}

export const CategoriesModel = new CategoriesRaw(
  db.collection('categories'),
  db.collection('trash')
);
