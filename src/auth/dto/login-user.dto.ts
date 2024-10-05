import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class LoginUserDto{
  @IsString()
  @IsEmail()
  @ApiProperty({
    default: "user@gmail.com"
})
  userEmail: string;
  @IsString()
  @MinLength(8)
  @ApiProperty({
    default: "12345678"
})
  userPassword: string;
}