import { Entity } from "typeorm";
import { Auth } from "../entities/user.entity";
import { IsEmail, IsOptional, IsString, MinLength , IsIn} from "class-validator";

@Entity()
export class CreateAuthDto extends Auth {
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
    @IsOptional()
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[];
}
