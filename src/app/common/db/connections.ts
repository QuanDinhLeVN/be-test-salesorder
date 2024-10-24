import mongoose, { syncIndexes } from 'mongoose';
const stringy = require('stringy');
import { Logger } from '../config/logger';
import config from '../config/config';
import { createCollections } from '../../models';

const logger = new Logger(module);

export class Connection {
  static async connectDB(url: string) {
    try {
      if (url !== '') {
        await this.connectMongoose(url);
        await createCollections();
        await syncIndexes();
      }
    } catch (error) {
      process.exit(1);
    }
  }

  static async connectMongoose(url: string) {
    mongoose.set(
      'debug',
      (collectionName: string, methodName: string, ...methodArgs: any) => {
        if (config.logLevel === 'debug') {
          logger.debug(
            `Mongoose: ${collectionName}.${methodName} 
            ${stringy.stringify(methodArgs)}`
          );
        }
      }
    );
    await mongoose.connect(url, {
      autoIndex: false,
    });

    mongoose.connection.on('error', () => {
      logger.error('Mongo Db connection error');
      process.exit(1);
    });
    logger.info('Successfully connected to MongoDB');
  }
}
