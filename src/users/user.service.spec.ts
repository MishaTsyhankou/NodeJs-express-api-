import 'reflect-metadata';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';
import { TYPES } from '../../types';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './ user.entity';
import { UserModel } from '@prisma/client';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUserRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();

let configService: IConfigService;
let usersRepository: IUserRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUserRepository>(TYPES.UserRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUserRepository>(TYPES.UserRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		createdUser = await userService.createUser({
			email: 'misha@gmail.ru',
			name: 'misha',
			password: '123456',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('123456');
	});

	it('validateUser - succes', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const res = await userService.validateUser({
			email: 'misha@gmail.ru',
			password: '123456',
		});

		expect(res).toBeTruthy();
	});

	it('validateUser - error', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const res = await userService.validateUser({
			email: 'misha@gmail.ru',
			password: '13',
		});

		expect(res).toBeFalsy();
	});

	it('validateUser - wrong user', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);

		const res = await userService.validateUser({
			email: 'misha@gmail.ru',
			password: '13',
		});

		expect(res).toBeFalsy();
	});
});
