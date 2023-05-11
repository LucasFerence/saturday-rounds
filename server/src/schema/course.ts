import {Static, Type} from '@sinclair/typebox';
import {Schema, DataDocument, SafeType} from './schema';
import {ProviderType} from './provider';
import {SourceType} from './source';

/*
Course: Standardized golf course
*/

// Create a safe type for Course
export const CourseType = SafeType({
  name: Type.String(),
  image: Type.Optional(Type.String()),
  source: Type.Optional(SourceType),
  provider: Type.Optional(ProviderType),
});

// Create the Course DataDocument type based on the SafeType
type Type = Static<typeof CourseType>;
export interface Course extends Type, DataDocument {}

// Create a Schema for the Course type to allow DB association
export class CourseSchema implements Schema<Course> {
  collection = 'courses';
}
