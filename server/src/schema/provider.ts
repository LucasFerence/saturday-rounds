import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';

/*
Provider: Technical provider for golf content. Potential examples: ChronoGolf, GolfNow
*/

export const ProviderType = SafeType({
  name: Type.String(),
});

type Type = Static<typeof ProviderType>;
export class Provider
  extends DataDocument
  implements Static<typeof ProviderType>
{
  getSchema(): Schema {
    return new ProviderSchema();
  }
}

export class ProviderSchema implements Schema {
  _col = 'providers';
}
