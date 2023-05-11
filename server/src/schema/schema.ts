import {WithoutId, Document} from 'node_modules/mongodb';
import {Type, TProperties, TObject} from '@sinclair/typebox';

export type DataDocument = WithoutId<Document>;

/**
 * Builds a safe type to be used generically in the system.
 * Examples where this type is safely used:
 * 1. In request processing
 * 2. In database transactions.
 *
 * This should be used instead of Type.Object() from TypeBox when
 * creating objects to model requests after
 * @param properties any TypeBox properties to create a type
 * @returns {TObject}
 */
export function SafeType(properties: TProperties): TObject {
  properties['_id'] = Type.Optional(Type.String());
  return Type.Object(properties, {additionalProperties: false});
}

/**
 * Interface to denote a DataDocument and it's relation to the database.
 * Requires a collection to denote where this DataDocument is stored
 */
export interface Schema<T extends DataDocument> {
  readonly collection: string;
}
