import dotenvSafe, { DotenvSafeOptions } from 'dotenv-safe';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';

const getDotEnvSafeConfig = (): DotenvSafeOptions => {
  const getConfigPath = () => {
    if (process.env.NODE_ENV === 'test') {
      return path.join(__dirname, '../../../../.env.test');
    }
    const pathEnv: string = path.join(__dirname, '../../../../.env');
    if (fs.existsSync(pathEnv)) {
      return pathEnv;
    }
    return null;
  };
  const configPath = getConfigPath();
  const dotEnvConfig: any = {
    allowEmptyValues: true,
    path: configPath,
    sample: path.join(__dirname, '../../../../.env.template'),
  };
  if (!configPath) {
    delete dotEnvConfig.path;
  }
  return dotEnvConfig;
};

// import .env variables
dotenvSafe.config(getDotEnvSafeConfig());

const config = {
  env: process.env.NODE_ENV,
  isDevelopment: process.env.NODE_ENV === 'development',
  port: process.env.NODE_PORT,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  logLevel: process.env.LOG_LEVEL || 'info',
  dbConfig: {
    uri: process.env.MONGODB_URI || '',
    transactionRetryCount: Number(process.env.MAX_TRANSACTION_RETRY) as number,
    transactionDisabled: process.env.SKIP_USER_VALIDATION === 'true',
    eventDbName: process.env.EVENT_DATABASE_NAME as string,
    batchSizeCursor: Number(process.env.BATCH_SIZE_CURSOR) || 3000,
  },
  keepAliveTimeout: Number(process.env.KEEP_ALIVE_TIMEOUT),
  headersTimeout: Number(process.env.HEADERS_TIMEOUT),
};

export { config };
export default config;
