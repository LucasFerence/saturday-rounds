import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {Collection} from 'node_modules/mongodb';
import {Course, COURSE_COLLECTION} from 'src/schema/course';

const PLUGIN_NAME = 'courseAccess';

// Define the additional method on fastify
declare module 'fastify' {
  interface FastifyInstance {
    courseAccess: () => CourseAccess;
  }
}

// Decorate fastify with the courseAccess class
const courseAccess: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.decorate(PLUGIN_NAME, () => new CourseAccess());
};

/**
 * Get the collection or undefined for courses
 * @param fastify fastify instance to access other plugins
 * @returns {Collection<TSchema>}
 */
function getCollection(
  fastify: FastifyInstance
): Collection<Course> | undefined {
  return fastify.mongo.db?.collection(COURSE_COLLECTION);
}

/**
 * Access for all course database access
 */
class CourseAccess {
  /**
   * Get a course from the database given an ID
   * @param fastify Castify instance
   * @param id ID of the course
   * @returns {Promise<Course>}
   */
  async getCourse(fastify: FastifyInstance, id: string): Promise<Course> {
    const collection = getCollection(fastify);
    const query = {id: id};

    return (await collection?.findOne(query)) as Course;
  }

  /**
   * Upserts the course (insert or update an existing course)
   * @param fastify fastify instance
   * @param course Course to insert or update
   */
  async upsertCourse(fastify: FastifyInstance, course: Course) {
    const collection = getCollection(fastify);

    const filter = {id: course.id};
    const options = {upsert: true};

    const updateDoc = {
      $set: {
        id: course.id,
        name: course.name,
        image: course.image,
        source: course.source,
        provider: course.provider,
      },
    };

    await collection?.updateOne(filter, updateDoc, options);
  }
}

export default fp(courseAccess, {
  name: PLUGIN_NAME,
  dependencies: ['mongo'],
});
