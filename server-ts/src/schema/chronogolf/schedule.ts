import {Static, Type} from '@sinclair/typebox';

export const ScheduleDetailsType = Type.Object({
  userId: Type.String(),
  clubId: Type.String(),
  courseId: Type.String(),
  date: Type.String({format: 'date-time'}),
  playerCount: Type.Integer({minimum: 1, maximum: 4}),
  earliestTime: Type.String({format: 'date-time'}),
  latestTime: Type.String({format: 'date-time'}),
  checkout: Type.Optional(Type.Boolean()),
});

export type ScheduleDetails = Static<typeof ScheduleDetailsType>;
