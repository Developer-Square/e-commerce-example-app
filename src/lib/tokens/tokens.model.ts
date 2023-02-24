import type { IndexDescription } from 'mongodb';

import { BaseRaw } from '../mongo/BaseRaw';
import db from '../mongo/client';
import type { IToken as T } from './tokens.types';

export class TokensRaw extends BaseRaw<T> {
  // eslint-disable-next-line class-methods-use-this
  protected modelIndexes(): IndexDescription[] {
    return [
      {
        key: { user: 1, type: 1, blacklisted: 1 },
      },
    ];
  }
}

export const TokensModel = new TokensRaw(
  db.collection('tokens')
);
