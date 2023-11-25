import { CouchbaseConnectionFactory } from './couchbase-connection-factory';
import { Collection } from 'couchbase';
import { DefaultCollection, ScopedCollection } from './configs';
import { CouchbaseRepositoryMixin } from './couchbase-repository-mixin';
import { MixinCollection } from './models';

export class CouchbaseRepositoryFactory {
  static async createDefaultCollection(
    conn: CouchbaseConnectionFactory,
    configs: DefaultCollection,
  ): Promise<MixinCollection> {
    const collection = await conn.getDefaultCollection(configs);

    return new CouchbaseRepositoryMixin(collection).extend();
  }

  static async createCollection(
    conn: CouchbaseConnectionFactory,
    config: ScopedCollection,
  ): Promise<Collection> {
    return await conn.getScopedCollection(config);
  }
}
