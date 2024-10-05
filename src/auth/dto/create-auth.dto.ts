import { Entity } from "typeorm";
import { Auth } from "../entities/user.entity";
import { IsEmail, IsOptional, IsString, MinLength , IsIn} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CreateAuthDto extends Auth {
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    @ApiProperty({
        default: "12345678"
    })
    userPassword: string;
    @IsOptional()
    @ApiProperty({
        default: "Employee"
    })
    @IsIn(["Admin", "Employee", "Manager"])
    userRoles: string[];
}
