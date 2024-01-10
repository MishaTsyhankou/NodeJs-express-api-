import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../logger/logger.interface';
import { IConfigService } from './config.service.interface';

import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILoggerService) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Cant read file .env');
		} else {
			this.logger.log('[ConfigService] Conf loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
