import {Static, Type} from '@sinclair/typebox';
import {CourseType} from './course';
import {WithId, Document} from 'node_modules/mongodb';

export const ClubType = Type.Object({
  id: Type.String(),
  name: Type.String(),
  scheduleOffsetDays: Type.Integer(),
  scheduleOffsetHours: Type.Integer(),
  courses: Type.Array(CourseType),
});

type Type = Static<typeof ClubType>;

export interface Club extends Type, WithId<Document> {}

export const CLUB_COLLECTION = 'chronogolfClubs';
