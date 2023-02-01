/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb';

import envVariables from '../../config/envVariables';

// eslint-disable-next-line import/no-mutable-exports
let clientPromise: Promise<MongoClient>;
let client: MongoClient;

if (envVariables.env === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(envVariables.mongodb.uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(envVariables.mongodb.uri);
  clientPromise = client.connect();
}

export default (await clientPromise).db(envVariables.mongodb.dbName);
export { clientPromise };
