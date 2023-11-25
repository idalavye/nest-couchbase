import { MixinCollection } from './models';

export class CouchbaseRepositoryMixin {
  constructor(private collection: Partial<MixinCollection>) {
    this.collection.getMulti = (keys: string[]) => this.getMulti(keys);
    this.collection.setMulti = (keys: string[]) => this.setMulti(keys);
    this.collection.upsertMulti = (keys: { key: string; value: string }[]) =>
      this.upsertMulti(keys);
  }

  extend(): MixinCollection {
    return this.collection as MixinCollection;
  }

  getMulti(keys: string[]) {
    return Promise.all(keys.map((key) => this.collection.get(key)));
  }

  setMulti(keys: string[]) {
    return Promise.all(keys.map((key) => this.collection.set(key)));
  }

  upsertMulti(keys: { key: string; value: string }[]) {
    return Promise.all(
      keys.map(({ key, value }) => this.collection.upsert(key, value)),
    );
  }
}
