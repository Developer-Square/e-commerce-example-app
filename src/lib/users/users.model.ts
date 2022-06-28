import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import { getDb } from '../mongo/client';
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

export const UsersModel = async () => {
  const db = await getDb();
  return new UsersRaw(db.collection('users'), db.collection('trash'));
};
