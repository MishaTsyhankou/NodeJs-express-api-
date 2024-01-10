import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Error email' })
	email: string;
	@IsString({ message: 'Password should exist' })
	password: string;
}
