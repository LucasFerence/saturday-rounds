import {Static, Type} from '@sinclair/typebox';
import {DataDocument, SafeType, Schema} from './schema';

export const UserProviderDataType = Type.Object({});

export type UserProviderData = Static<typeof UserProviderDataType>;

export const UserType = SafeType({
  email: Type.String(),
  name: Type.Optional(Type.String()),
  providerData: Type.Record(Type.String(), UserProviderDataType),
});

export interface User extends Static<typeof UserType>, DataDocument {}

export class UserSchema implements Schema<User> {
  collection = 'users';
}
