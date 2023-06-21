import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, DataObj, DataRef} from './schema';
import {ProviderSchema} from './provider';
import {AggregateSchema} from './aggregate';

/*
Course: Standardized golf course
*/

// Create a safe type for Course
export const CourseType = DataObj({
  externalId: Type.String(),
  provider: DataRef(new ProviderSchema()),
  aggregate: DataRef(new AggregateSchema()),
  name: Type.String(),
  image: Type.Optional(Type.String()),
});

// Create the Course DataDocument type based on the SafeType
export interface Course extends DataDocument, Static<typeof CourseType> {}

// Create a Schema for the Course type to allow DB association
export class CourseSchema implements Schema {
  _col = 'courses';
}
