import {
  CouchbaseBucketConfig,
  CouchbaseConnectionFactory,
  CouchbaseModuleAsyncOptions,
  CouchbaseRepositoryFactory,
  getDefaultCollectionToken,
  setDefaultCollectionToken,
  getCouchbaseClusterToken,
} from '../index';
import { Logger, Provider } from '@nestjs/common';
import { getConnectionToken, getModuleOptionsToken } from './utils';
import { CouchbaseConnectionConfigs } from '../couchbase';
import { CouchbaseModuleCollectionAsyncOptions } from './couchbase-collection.module';

export const createCouchbaseAsyncConnectionProviders = (
  options: CouchbaseModuleAsyncOptions,
): Provider[] => [
  {
    provide: getModuleOptionsToken(),
    useFactory: options.useFactory,
    inject: options.inject || [],
  },
  {
    provide: getConnectionToken(),
    useFactory: async (config: CouchbaseConnectionConfigs, logger: Logger) =>
      CouchbaseConnectionFactory.create(config, logger),
    inject: [getModuleOptionsToken()],
  },
];

export const createUseCollectionAsyncProviders = (
  options: CouchbaseModuleCollectionAsyncOptions,
): Provider[] => {
  return [
    {
      provide: setDefaultCollectionToken(options.selector),
      useFactory: options.useFactory,
      inject: options.inject || [],
    },
    {
      provide: getDefaultCollectionToken(options.selector),
      useFactory: async (
        conn: CouchbaseConnectionFactory,
        config: CouchbaseBucketConfig,
      ) =>
        CouchbaseRepositoryFactory.createDefaultCollection(conn, {
          bucket: config.bucket,
        }),
      inject: [
        getConnectionToken(),
        setDefaultCollectionToken(options.selector),
      ],
    },
  ];
};

export const createUseScopedCollectionAsyncProviders = (
  options: CouchbaseModuleCollectionAsyncOptions,
): Provider[] => {
  return [
    {
      provide: setDefaultCollectionToken(options.selector),
      useFactory: options.useFactory,
      inject: options.inject || [],
    },
    {
      provide: getDefaultCollectionToken(options.selector),
      useFactory: async (
        conn: CouchbaseConnectionFactory,
        config: CouchbaseBucketConfig,
      ) =>
        CouchbaseRepositoryFactory.createCollection(conn, {
          bucket: config.bucket,
          name: config.name,
          scope: config.scope,
        }),
      inject: [
        getConnectionToken(),
        setDefaultCollectionToken(options.selector),
      ],
    },
  ];
};

export const createCouchbaseClusterProvider = (): Provider => ({
  provide: getCouchbaseClusterToken(),
  useFactory: async (conn: CouchbaseConnectionFactory) => conn.cluster,
  inject: [getConnectionToken()],
});

export const createCouchbaseClusterProviders = (): Provider =>
  createCouchbaseClusterProvider();
