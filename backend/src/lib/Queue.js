import Bee from 'bee-queue';
import CriarUserEnviaEmailAWS from '../app/jobs/CriarUserEnviaEmailAWS';
import CancellationMail from '../app/jobs/CancellationMail';
import RedefinirPasswordMail from '../app/jobs/RedefinirPasswordMail';
import CadOrderMailAWS from '../app/jobs/CadOrderMailAWS';

import redisConfig from '../config/redis';

const jobs = [
  CancellationMail,
  CriarUserEnviaEmailAWS,
  RedefinirPasswordMail,
  CadOrderMailAWS,
];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    if (process.env.NODE_ENV === 'development') {
      // console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
  }
}

export default new Queue();
