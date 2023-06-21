import {WithoutId, Document} from 'node_modules/mongodb';
import {Type, TProperties, TObject, TSchema} from '@sinclair/typebox';

export interface DataDocument extends WithoutId<Document> {
  // Mongo _id of item (optional if new)
  _id?: string;
}

export interface DataTProperties extends TProperties {
  _id: TSchema;
}

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
export function DataObj(properties: TProperties): TObject<DataTProperties> {
  const dataProperties = properties as DataTProperties;
  dataProperties._id = Type.Optional(Type.String());

  return Type.Object(dataProperties, {additionalProperties: false});
}

export interface DataRefProperties extends TProperties {
  $id: TSchema;
  $ref: TSchema;
}

/**
 * Models a reference to another piece of data.
 * Built to handle a DBRef as detailed here: https://www.mongodb.com/docs/manual/reference/database-references/#dbrefs
 */
export function DataRef<T extends Schema>(
  schema: T
): TObject<DataRefProperties> {
  const refProperties = {
    $id: Type.String(),
    $ref: Type.Literal(schema._col),
  } as DataRefProperties;

  return Type.Object(refProperties);
}

/**
 * Interface to denote a DataDocument and it's relation to the database.
 * Requires a collection to denote where this DataDocument is stored
 */
export interface Schema {
  _col: string;
}

/**
 * Tool to create a reference schema from the value provided from $ref
 */
export class RefSchema implements Schema {
  _col: string;

  constructor(_col: string) {
    this._col = _col;
  }
}
