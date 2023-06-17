import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';

/*
Course: Standardized golf course
*/

// Create a safe type for Course
export const CourseType = SafeType({
  externalId: Type.String(),
  aggregateId: Type.String(),
  providerId: Type.String(),
  name: Type.String(),
  image: Type.Optional(Type.String()),
});

// Create the Course DataDocument type based on the SafeType
type Type = Static<typeof CourseType>;
export interface Course extends Type, DataDocument {}

// Create a Schema for the Course type to allow DB association
export class CourseSchema implements Schema<Course> {
  collection = 'courses';
}
