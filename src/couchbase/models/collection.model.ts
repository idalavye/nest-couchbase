import { Collection, CouchbaseSet, GetResult, MutationResult } from 'couchbase';

export type MixinCollection = Collection & {
  getMulti: (keys: string[]) => Promise<GetResult[]>;
  setMulti: (keys: string[]) => Promise<CouchbaseSet[]>;
  upsertMulti: (
    keys: { key: string; value: string }[],
  ) => Promise<MutationResult[]>;
};
