import {Static, Type} from '@sinclair/typebox';
import {DataDocument, DataObj, Schema} from './schema';

export const UserProviderDataType = Type.Object({});

export type UserProviderData = Static<typeof UserProviderDataType>;

export const UserType = DataObj({
  email: Type.String(),
  name: Type.Optional(Type.String()),
  providerData: Type.Record(Type.String(), UserProviderDataType),
});

export interface User extends DataDocument, Static<typeof UserType> {}

export class UserSchema implements Schema {
  _col = 'users';
}
