import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { IUser as T } from './users.types';

export class UsersRaw extends BaseRaw<T> {
  // eslint-disable-next-line class-methods-use-this
  protected modelIndexes(): IndexDescription[] {
    return [
      {
        key: { name: 1, email: 1 },
        unique: true,
      },
    ];
  }
}

export const UsersModel = new UsersRaw(
  db.collection('users'),
  db.collection('trash')
);
