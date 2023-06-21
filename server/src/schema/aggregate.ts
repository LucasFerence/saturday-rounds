import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, DataObj, DataRef} from './schema';
import {ProviderSchema} from './provider';

/*
Aggregate: Aggreagate of some golf content. This will be associated with a provider.
Many courses can be associated with a single aggregate.
This is a more generic term of the ChronoGolf club.
*/

export const AggregateType = DataObj({
  externalId: Type.String(),
  provider: DataRef(new ProviderSchema()),
  name: Type.String(),
  minuteScheduleOffset: Type.Integer(),
});

export interface Aggregate extends DataDocument, Static<typeof AggregateType> {}

export class AggregateSchema implements Schema {
  _col = 'aggregates';
}
