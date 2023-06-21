import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, DataObj} from './schema';

/*
Provider: Technical provider for golf content. Potential examples: ChronoGolf, GolfNow
*/

export const ProviderType = DataObj({
  name: Type.String(),
});

export interface Provider extends DataDocument, Static<typeof ProviderType> {}

export class ProviderSchema implements Schema {
  _col = 'providers';
}
