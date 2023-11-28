## Description
[![npm version](https://badge.fury.io/js/nest-couchbase.svg)](https://www.npmjs.com/package/nest-couchbase)

Couchbase Modules for NestJS projects

## Installation
```curl
// npm
npm i nest-couchbase

// yarn
yarn add nest-couchbase
```

## Usage
### Configure Connection
We can add this configs in ApplicationModule.ts

```typescript
@Module({
    imports: [
        CouchbaseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    uri: 'couchbase://<ips>',
                    username: '<user-name>',
                    password: '<password>',
                    buckets: [
                        {
                            bucket: 'sponsored-collection',
                        },
                        {
                            bucket: 'browsing-sellerads',
                        },
                    ],
                };
            },
        }),
    ],
})
export class ApplicationModule {}
```



#### Using Default Collection
```typescript
import { Module } from '@nestjs/common';
import { CbTestController } from './cb-test.controller';
import { CbTestService } from './cb-test.service';
import { CouchbaseModule } from 'nest-couchbase';

@Module({
    imports: [
        CouchbaseModule.useDefaultCollectionAsync({
            selector: 'BrowsingSellerAds',
            useFactory: async () => ({
                bucket: 'browsing-sellerads',
            }),
        }),
    ],
    controllers: [CbTestController],
    providers: [CbTestService],
})
export class CbTestModule {}
```

#### Scoped Collection 
```typescript
import { Module } from '@nestjs/common';
import { CbTestController } from './cb-test.controller';
import { CbTestService } from './cb-test.service';
import { CouchbaseModule } from 'nest-couchbase';

@Module({
    imports: [
        CouchbaseModule.useScopedCollectionAsync({
            selector: 'BrowsingSellerAds',
            useFactory: async () => ({
                bucket: 'browsing-sellerads',
                name: 'COMMISSION',
                scope: 'affiliate',
            }),
        }),
    ],
    controllers: [CbTestController],
    providers: [CbTestService],
})
export class CbTestModule {}

```

### Using In Service (For Default)
````typescript
import { Injectable } from '@nestjs/common';
import { InjectDefaultCollection, MixinCollection } from 'nest-couchbase';

@Injectable()
export class CbTestService {
    constructor(@InjectDefaultCollection('SponsoredCollection') private collection: MixinCollection) {}
    get() {
        return this.collection.getMulti([
            'sponsored_collection_content:0ab91168-b646-4b7d-a672-06cdc534fe7b_10985771',
            'sponsored_collection_content:0ab91168-b646-4b7d-a672-06cdc534fe7b_11026292',
        ]);
    }
}
````

### Using Cluster Scope Query
````typescript
import { Injectable } from '@nestjs/common';
import { InjectCouchbaseCluster, Cluster } from 'nest-couchbase';

@Injectable()
export class CbTestService {
    constructor(@InjectCouchbaseCluster() private cluster: Cluster) {}
    
    get() {
        return this.cluster.query("select b.* from `browsing-sellerads` b where type = 'TAA' limit 1");
    }
}
````

## WIP
* Collection content type support
* Cluster scope query support [done]
* Benchmark results
* getMulti, setMulti document support [done]
* ...

