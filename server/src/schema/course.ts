import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';

/*
Course: Standardized golf course
*/

// Create a safe type for Course
export const CourseType = SafeType({
  externalId: Type.String(),
  providerId: Type.String(),
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
