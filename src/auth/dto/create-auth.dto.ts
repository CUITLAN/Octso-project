import { Entity } from "typeorm";
import { Auth } from "../entities/user.entity";
import { IsEmail, IsString, MinLength } from "class-validator";

@Entity()
export class CreateAuthDto extends Auth {
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
}
