import { DynamicModule, Module } from '@nestjs/common';
import {
  CouchbaseCoreModule,
  CouchbaseModuleAsyncOptions,
} from './couchbase-core.module';
import {
  CouchbaseCollectionModule,
  CouchbaseModuleCollectionAsyncOptions,
} from './couchbase-collection.module';

@Module({})
export class CouchbaseModule {
  static forRootAsync(config: CouchbaseModuleAsyncOptions): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCoreModule.forRootAsync(config)],
    };
  }

  static useDefaultCollectionAsync(
    configs: CouchbaseModuleCollectionAsyncOptions,
  ): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [
        CouchbaseCollectionModule.forUseDefaultCollectionAsync(configs),
      ],
      exports: [CouchbaseCollectionModule],
    };
  }

  static useScopedCollectionAsync(
    configs: CouchbaseModuleCollectionAsyncOptions,
  ): DynamicModule {
    return {
      module: CouchbaseModule,
      imports: [CouchbaseCollectionModule.forUseScopedCollectionAsync(configs)],
      exports: [CouchbaseCollectionModule],
    };
  }
}
