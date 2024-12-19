import { IsBoolean, IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateUser {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  roles: string;

  @IsString()
  pass: string;

  @IsBoolean()
  @IsOptional()
  delete: boolean = false;
}
