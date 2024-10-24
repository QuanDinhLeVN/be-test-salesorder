import mongoose from 'mongoose';
import { Router } from 'express';
import { getMongoStatus } from '../../common/healthcheck';

const router = Router();

router.use('/', (req: any, res: any): void => {
  const mongoStatus = getMongoStatus(mongoose.connection);
  const healthCheckStatus = {
    mongoStatus: mongoStatus.status,
  };
  if (mongoStatus.isHealthy) {
    return res.status(200).send({ status: 'UP', ...healthCheckStatus });
  }
  return res.status(500).send({ status: 'DOWN', ...healthCheckStatus });
});

export default router;
