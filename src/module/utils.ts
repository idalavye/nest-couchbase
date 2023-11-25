import {
  COUCHBASE_CONNECTION_TOKEN,
  COUCHBASE_MODULE_OPTIONS,
} from './constants';

export type __NOOP__ = () => void;

export const getConnectionToken = (): string => COUCHBASE_CONNECTION_TOKEN;
export const getModuleOptionsToken = (): string => COUCHBASE_MODULE_OPTIONS;

export const getCouchbaseClusterToken = () => 'COUCHBASE_CLUSTER_TOKEN';

export const getCollectionToken = (collectionName: string): string =>
  `${collectionName}_COLLECTION_TOKEN`;

export const getDefaultCollectionToken = (symbol: string): string =>
  `GET_DEFAULT_COLLECTION_TOKEN_REPOSITORY_TOKEN_${symbol}`;

export const setDefaultCollectionToken = (symbol: string): string =>
  `SET_DEFAULT_COLLECTION_TOKEN_REPOSITORY_TOKEN_${symbol}`;
