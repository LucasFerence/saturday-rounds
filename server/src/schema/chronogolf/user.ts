import {Static, Type} from '@sinclair/typebox';
import {WithId, Document} from 'node_modules/mongodb';

export const UserType = Type.Object({
  id: Type.String(),
  username: Type.String(),
  password: Type.String(),
});

type Type = Static<typeof UserType>;

export interface User extends Type, WithId<Document> {}

export const USER_COLLECTION = 'chronogolfUsers';
