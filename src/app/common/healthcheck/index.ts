import { Connection } from 'mongoose';
import { IHealthStatus } from './interface';
import { HEALTH_CHECK } from '../constants';

export function getMongoStatus(connection: Connection): IHealthStatus {
  const mongoConnectionState = connection.readyState;
  return {
    isHealthy: HEALTH_CHECK.MONGODB_ACTIVE.includes(connection.readyState),
    status:
      HEALTH_CHECK.MONGODB[
        mongoConnectionState as keyof typeof HEALTH_CHECK.MONGODB
      ],
  };
}
