import{ IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(155)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    
    phone: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
