/**
 * Application Entry point
 * @type {createApplication}
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from '../routes';

/**
 * Create Express server.
 */
// Register the provider to begin tracing
const app = express();
/**
 * Express configuration.
 */
app.use(cors());
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 5000,
  }),
);
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', routes);

export default app;
