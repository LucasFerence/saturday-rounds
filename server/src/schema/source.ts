import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';
import {ProviderType} from './provider';

/*
Source: Source of some golf content. This will be associated with a provider.
Many courses can be associated with a source.
This is a more generic term of the ChronoGolf club.
*/

export const SourceType = SafeType({
  name: Type.String(),
  provider: ProviderType,
});

type Type = Static<typeof SourceType>;
export interface Source extends Type, DataDocument {}

export class SourceSchema implements Schema<Source> {
  collection = 'sources';
}
