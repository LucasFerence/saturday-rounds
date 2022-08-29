import {Static, Type} from '@sinclair/typebox';
import {WithId, Document} from 'node_modules/mongodb';

export const CourseType = Type.Object({
  id: Type.String(),
  name: Type.String(),
});

type Type = Static<typeof CourseType>;

export interface Course extends Type, WithId<Document> {}
