import {Static, Type} from '@sinclair/typebox';

export const ScheduleDetailsType = Type.Object(
  {
    userId: Type.String(),
    aggregateId: Type.String(),
    courseId: Type.String(),
    teeTimeDate: Type.String({format: 'date-time'}),
    playerCount: Type.Integer({minimum: 1, maximum: 4}),
    earliestTime: Type.String({format: 'date-time'}),
    latestTime: Type.String({format: 'date-time'}),
    debugMode: Type.Optional(Type.Boolean()),
  },
  {additionalProperties: false}
);

export type ScheduleDetails = Static<typeof ScheduleDetailsType>;
