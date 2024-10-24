import path from 'path';
import winston, { format, transports } from 'winston';
import { config } from './config';

export class Logger {
  private readonly winstonLogger: winston.Logger;

  constructor(private module: NodeModule) {
    const BASE_PATH = path.resolve('.');
    const fileName = module.filename;
    const logFormat = format.printf((info) =>
      JSON.stringify({
        n_time: info.timestamp,
        n_level: info.level,
        n_message: info.message,
        n_module: fileName.split(BASE_PATH)[1],
        n_correlationId: '',
      }),
    );
    const transportList = [
      new transports.Console({
        format: format.combine(format.timestamp(), logFormat),
      }),
    ];

    this.winstonLogger = winston.createLogger({
      level: config.logLevel,
      transports: transportList,
      exitOnError: false,
      silent: config.env === 'test',
    });
  }

  /**
   * Log a message with the level of "Debug".
   */
  debug(message: any): void {
    this.createLog('debug', message);
  }

  /**
   * Log a message with the level of "Info".
   */
  info(message: any): void {
    this.createLog('info', message);
  }

  /**
   * Log a message with the level of "Error".
   */
  error(message: any): void {
    this.createLog('error', message);
  }

  /**
   * Log a message with the level of "Warning".
   */
  warn(message: any): void {
    this.createLog('warn', message);
  }

  private createLog(level: string, message: any): void {
    const messageString =
      message instanceof Error && message
        ? `${message}\n${message.stack}`
        : message;
    this.winstonLogger.log(level, messageString);
  }
}
