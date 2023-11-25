import { Inject } from '@nestjs/common';
import {
  getCollectionToken,
  getConnectionToken,
  getCouchbaseClusterToken,
  getDefaultCollectionToken,
} from '../utils';

export const InjectCollection = (collectionName: string): ParameterDecorator =>
  Inject(getCollectionToken(collectionName));

export const InjectDefaultCollection = (
  selector: string,
): ParameterDecorator => {
  return Inject(getDefaultCollectionToken(selector));
};

export const InjectConnection = (): ParameterDecorator =>
  Inject(getConnectionToken());

export const InjectCouchbaseCluster = (): ParameterDecorator =>
  Inject(getCouchbaseClusterToken());
