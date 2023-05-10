import {Static, Type} from '@sinclair/typebox';
import {WithId, Document} from 'node_modules/mongodb';

/*
Provider: Technical provider for golf content. Potential examples: ChronoGolf, GolfNow
*/

export const ProviderType = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

type Type = Static<typeof ProviderType>;
export interface Provider extends Type, WithId<Document> {}

export const PROVIDER_COLLECTION = 'providers';
