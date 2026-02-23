import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubmissionDto {
	@IsString()
	@MinLength(2)
	@MaxLength(100)
	name: string;

	@IsEmail()
	@MaxLength(254)
	email: string;

	@IsString()
	@MinLength(1)
	@MaxLength(1000)
	message: string;
}
