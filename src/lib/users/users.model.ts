import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import applySchemaValidation from '../mongo/utils/applySchemaValidation';
import { userSchema } from './users.schema';
import type { IUser as T } from './users.types';

const userCollectionName = 'users';

export class UsersRaw extends BaseRaw<T> {
  // eslint-disable-next-line class-methods-use-this
  protected modelIndexes(): IndexDescription[] {
    return [
      {
        key: { name: 1 },
        unique: true,
      },
      {
        key: { email: 1 },
        unique: true,
      },
    ];
  }
}

export const UsersModel = new UsersRaw(
  db.collection(userCollectionName),
  db.collection('trash')
);

// eslint-disable-next-line func-names
(async function(){
  await applySchemaValidation(db, userSchema, userCollectionName);
})();
