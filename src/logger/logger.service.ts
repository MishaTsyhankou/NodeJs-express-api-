import { ILogObj, ISettingsParam, Logger } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import { TYPES } from '../../types';
import 'reflect-metadata';

const loggerSettings = {
	displayInstanceName: false,
	displayLoggerName: false,
	displayFilePath: false,
	displayFunctionName: false,
};

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger(loggerSettings as ISettingsParam<ILogObj>);
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
