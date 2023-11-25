import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CouchbaseBucketConfig } from '../couchbase';
import {
  createUseCollectionAsyncProviders,
  createUseScopedCollectionAsyncProviders,
} from './providers';
import { CouchbaseCoreModule } from './couchbase-core.module';

export interface CouchbaseModuleCollectionAsyncOptions {
  useFactory: (...args: any[]) => Promise<CouchbaseBucketConfig>;
  inject?: any[];
  selector: string;
}

@Module({})
export class CouchbaseCollectionModule {
  static forUseDefaultCollectionAsync(
    config: CouchbaseModuleCollectionAsyncOptions,
  ): DynamicModule {
    const providers = createUseCollectionAsyncProviders(config);
    return CouchbaseCollectionModule.outputDynamicModule(providers);
  }

  static forUseScopedCollectionAsync(
    config: CouchbaseModuleCollectionAsyncOptions,
  ): DynamicModule {
    const providers = createUseScopedCollectionAsyncProviders(config);
    return CouchbaseCollectionModule.outputDynamicModule(providers);
  }

  private static outputDynamicModule(providers: Provider[]): DynamicModule {
    return {
      module: CouchbaseCollectionModule,
      providers,
      exports: providers,
      imports: [CouchbaseCoreModule],
    };
  }
}
