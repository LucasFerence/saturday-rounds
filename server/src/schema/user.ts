import {Static, Type} from '@sinclair/typebox';
import {DataDocument, DataObj, Schema} from './schema';

export const UserProviderDataType = Type.Object({});

export type UserProviderData = Static<typeof UserProviderDataType>;

export const UserType = DataObj({
  email: Type.String(),
  name: Type.Optional(Type.String()),
  providerData: Type.Record(Type.String(), UserProviderDataType),
});

export class User extends DataDocument implements Static<typeof UserType> {
  getSchema(): Schema {
    return new UserSchema();
  }
}

export class UserSchema implements Schema {
  _col = 'users';
}
