import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType, DataRef} from './schema';
import {Provider} from './provider';
import {Aggregate} from './aggregate';

/*
Course: Standardized golf course
*/

// Create a safe type for Course
export const CourseType = SafeType({
  externalId: Type.String(),
  provider: DataRef(new Provider()),
  aggregate: DataRef(new Aggregate()),
  name: Type.String(),
  image: Type.Optional(Type.String()),
});

// Create the Course DataDocument type based on the SafeType
export class Course extends DataDocument implements Static<typeof CourseType> {
  getSchema(): Schema {
    return new CourseSchema();
  }
}

// Create a Schema for the Course type to allow DB association
export class CourseSchema implements Schema {
  _col = 'courses';
}
