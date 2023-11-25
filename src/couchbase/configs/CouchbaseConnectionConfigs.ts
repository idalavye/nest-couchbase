import { ConnectOptions } from 'couchbase';

export class CouchbaseConnectionConfigs {
  uri: string;
  username: string;
  password: string;
  buckets?: CouchbaseBucketConfig[];
  options?: ConnectOptions;
}

export interface CouchbaseBucketConfig {
  name?: string;
  bucket: string;
  password?: string;
  scope?: string;
}
