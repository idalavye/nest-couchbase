import {
  DynamicModule,
  Global,
  Module,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { CouchbaseConnectionFactory } from '../couchbase';
import { CouchbaseConnectionConfigs } from '../couchbase';
import {
  createCouchbaseAsyncConnectionProviders,
  createCouchbaseClusterProviders,
} from './providers';
import { InjectConnection } from './decorators';

export interface CouchbaseModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<CouchbaseConnectionConfigs>;
  inject?: any[];
}

@Global()
@Module({})
export class CouchbaseCoreModule implements OnApplicationShutdown {
  constructor(@InjectConnection() private conn: CouchbaseConnectionFactory) {}
  async onApplicationShutdown() {
    await this.conn.cluster.close();
  }

  static forRootAsync(config: CouchbaseModuleAsyncOptions): DynamicModule {
    return CouchbaseCoreModule.outputDynamicModule([
      ...createCouchbaseAsyncConnectionProviders(config),
      createCouchbaseClusterProviders(),
    ]);
  }

  private static outputDynamicModule(providers: Provider[]): DynamicModule {
    return {
      module: CouchbaseCoreModule,
      providers,
      exports: providers,
    };
  }
}
