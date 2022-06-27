export interface IDBRecord {
  _id: string;
  _updatedAt: Date;
  _createdAt: Date;
}

export type DBRecordDeleted<T> = T &
  IDBRecord & {
    _deletedAt: Date;
    __collection__: string;
  };
