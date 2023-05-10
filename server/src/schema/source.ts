import {Static, Type} from '@sinclair/typebox';
import {WithId, Document} from 'node_modules/mongodb';
import {ProviderType} from './provider';

/*
Source: Source of some golf content. This will be associated with a provider.
Many courses can be associated with a source.
This is a more generic term of the ChronoGolf club.
*/

export const SourceType = Type.Object({
  id: Type.String(),
  name: Type.String(),
  provider: ProviderType,
});

type Type = Static<typeof SourceType>;
export interface Source extends Type, WithId<Document> {}

export const SOURCE_COLLECTION = 'sources';
