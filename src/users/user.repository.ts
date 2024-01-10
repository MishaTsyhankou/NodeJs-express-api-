import { UserModel } from '@prisma/client';
import { IUserRepository } from './user.repository.interface';
import { User } from './ user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { PrismaService } from '../database/prisma.service';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.ILoggerService) private logger: ILogger,
	) {}

	async create({ name, email, password }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				email,
				password,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
