import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';

/*
Provider: Technical provider for golf content. Potential examples: ChronoGolf, GolfNow
*/

export const ProviderType = SafeType({
  name: Type.String(),
});

type Type = Static<typeof ProviderType>;
export interface Provider extends Type, DataDocument {}

export class ProviderSchema implements Schema<Provider> {
  collection = 'providers';
}
