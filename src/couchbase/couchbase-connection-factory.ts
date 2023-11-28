import {
  CouchbaseConnectionConfigs,
  DefaultCollection,
  ScopedCollection,
} from './configs';
import { Bucket, BucketManager, Cluster, Collection } from 'couchbase';
import { BadRequestException, Logger } from '@nestjs/common';
import * as couchbase from 'couchbase';

export class CouchbaseConnectionFactory {
  cluster: Cluster;
  buckets: Record<string, Bucket> = {};
  bucketManager: BucketManager;

  constructor(
    public config: CouchbaseConnectionConfigs,
    public logger: Logger,
  ) {}

  static async create(
    config: CouchbaseConnectionConfigs,
    logger: Logger,
  ): Promise<CouchbaseConnectionFactory> {
    const conn = new CouchbaseConnectionFactory(config, logger);
    await conn.createCluster();

    return conn;
  }

  private async createCluster(): Promise<void> {
    try {
      this.cluster = await couchbase.connect(this.config.uri, {
        username: this.config.username,
        password: this.config.password,
      });
    } catch (e) {
      console.error(`Connection failed, trying deprecated method! Reason: ${JSON.stringify(
          e,
      )}`)

      this.cluster = new couchbase.Cluster(this.config.uri, {
        username: this.config.username,
        password: this.config.password,
      });
    }

    this.bucketManager = this.cluster.buckets();
    try {
      this.config.buckets.forEach((config) => {
        this.buckets[config.bucket] = this.cluster.bucket(config.bucket);
      });
    }catch (e) {
      throw new BadRequestException('bucket not found');
    }

  }

  async getDefaultCollection(configs: DefaultCollection): Promise<Collection> {
    const bucket = this.buckets[configs.bucket];
    if (!bucket) {
      throw new BadRequestException('bucket not found');
    }

    return bucket.defaultCollection();
  }

  async getScopedCollection(configs: ScopedCollection): Promise<Collection> {
    const bucket = this.buckets[configs.bucket];
    if (!bucket) {
      throw new BadRequestException('bucket not found');
    }

    return bucket.scope(configs.scope).collection(configs.name);
  }
}
