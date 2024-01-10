import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Error email' })
	email: string;
	@IsString({ message: 'Password should exist' })
	password: string;
	@IsString({ message: 'Name should exist' })
	name: string;
}
