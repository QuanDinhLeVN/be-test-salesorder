import app from "../app/api/config/express";
import config from "../app/common/config/config";
import { Logger } from "../app/common/config/logger";
import { Connection } from "../app/common/db/connections";

const logger = new Logger(module);

const startConnectionDB = async () => {
  await Connection.connectDB(config.dbConfig.uri);
};

const startService = async () => {
  logger.info('BEGIN: warehouse service start service');
  const server = app.listen(config.port, () => {
    logger.info(`server started on port ${config.port} (${config.env})`);
  });
  server.keepAliveTimeout = config.keepAliveTimeout;
  server.headersTimeout = config.headersTimeout;
  logger.info('END: warehouse service start service');
};

const startApp = async (): Promise<void> => {
  await startConnectionDB();
  startService();
};

startApp();

export default app;
