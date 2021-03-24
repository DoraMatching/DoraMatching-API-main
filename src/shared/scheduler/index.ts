import nodeScheduler, { Job, JobCallback } from 'node-schedule';

const scheduler = (deadline: Date, job: JobCallback): Job => {
    return nodeScheduler.scheduleJob(deadline, job);
}

export default scheduler;