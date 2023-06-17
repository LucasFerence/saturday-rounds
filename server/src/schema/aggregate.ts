import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';

/*
Aggregate: Aggreagate of some golf content. This will be associated with a provider.
Many courses can be associated with a single aggregate.
This is a more generic term of the ChronoGolf club.
*/

export const AggregateType = SafeType({
  externalId: Type.String(),
  providerId: Type.String(),
  name: Type.String(),
});

export interface Aggregate extends Static<typeof AggregateType>, DataDocument {}

export class AggregateSchema implements Schema<Aggregate> {
  collection = 'aggregates';
}
