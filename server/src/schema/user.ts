import {Static, Type} from '@sinclair/typebox';
import {DataDocument, SafeType, Schema} from './schema';

export const ProviderDataType = Type.Object({});

export class UserProviderData implements Static<typeof ProviderDataType> {}

export const UserType = SafeType({
  email: Type.String(),
  name: Type.Optional(Type.String()),
  providerData: Type.Record(Type.String(), ProviderDataType),
});

export interface User extends Static<typeof UserType>, DataDocument {}

export class UserSchema implements Schema<User> {
  collection = 'users';
}
