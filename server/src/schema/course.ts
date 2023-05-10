import {Static, Type} from '@sinclair/typebox';
import {WithId, Document} from 'node_modules/mongodb';
import {ProviderType} from './provider';
import {SourceType} from './source';

/*
Course: Standardized golf course
*/

export const CourseType = Type.Object({
  id: Type.String(),
  name: Type.String(),
  image: Type.String(),
  source: SourceType,
  provider: ProviderType,
});

type Type = Static<typeof CourseType>;
export interface Course extends Type, WithId<Document> {}

export const COURSE_COLLECTION = 'courses';
