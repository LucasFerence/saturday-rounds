import {FastifyInstance} from 'fastify';
import {ApiConfig} from 'src/plugins/api/detailsApi';
import {Course, CourseSchema, CourseType} from 'src/schema/course';

export default async function courseApi(fastify: FastifyInstance) {
  // Create our API config and register the API
  const apiConfig: ApiConfig<Course> = {
    routePrefix: '/course',
    permission: 'course',
    schema: new CourseSchema(),
    type: CourseType,
    supportsGet: true,
    supportsCreate: true,
    supportsUpdate: true,
  };

  fastify.registerDetailsApi(apiConfig);
}
