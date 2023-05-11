import {FastifyInstance, FastifyPluginAsync} from 'fastify';
import fp from 'fastify-plugin';
import {Agenda, Job} from 'agenda';

export interface JobDefinition {
  // Do nothing by default
  execute(fastify: FastifyInstance, job: Job, done: () => void): void;
}

declare module 'fastify' {
  interface FastifyInstance {
    agenda: Agenda;
    jobTypes: Map<string, JobDefinition>;
  }
}

const agenda: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Configure the agenda with the mongo client
  const agenda = new Agenda({
    mongo: fastify.mongo.client.db(),
  });

  await agenda.start();
  fastify.decorate('agenda', agenda);

  // Prepare the map for job types to be entered into
  fastify.decorate('jobTypes', new Map<string, JobDefinition>());

  fastify.addHook('onClose', async fastify => {
    await fastify.agenda.close();
  });

  // When the server starts up and all plugins and routes are ready, refresh jobs
  fastify.addHook('onReady', async () => {
    refreshJobs(fastify);
  });
};

/*
Refresh all jobs that had not successfuly completed or are still scheduled
when the server shut down. This ensures that regardless of restart/failure
all jobs that were scheduled are maintained
*/
async function refreshJobs(fastify: FastifyInstance) {
  const agenda: Agenda = fastify.agenda;

  // Look for jobs that need to be re-defined (has a next ran date)
  const jobs = await agenda.jobs({
    nextRunAt: {$ne: null},
  });

  console.log(`Refreshing [${jobs.length}] jobs`);

  jobs.map(async job => {
    const jobData = job.attrs;
    const type = job.attrs.data?.type as string | undefined;

    if (type === undefined) {
      console.log(`Found invalid data for job ${jobData.name}`);
      return;
    }

    const definition: JobDefinition | undefined = fastify.jobTypes.get(type);

    // If we have an associated execution, register it with the method
    // By redefining, we are bringing the job back into memoryg
    if (definition !== undefined) {
      agenda.define(jobData.name, (job, done) => {
        definition.execute(fastify, job, done);
      });
    }
  });
}

export default fp(agenda, {
  name: 'agenda',
  dependencies: ['mongo'],
});
