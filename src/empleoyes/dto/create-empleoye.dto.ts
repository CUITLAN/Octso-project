import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Empleoye } from "../entities/empleoye.entity";
import { Location } from "src/location/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class CreateEmpleoyeDto extends Empleoye{
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    Empleoyename: string;
    @IsString()
    @ApiProperty()
    @MaxLength(70)
    EmpleoyelastName: string;
    @IsString()
    @ApiProperty()
    @MaxLength(10)
    EmpleoyePhoneNumber: string;
    @IsString()
    @IsEmail()
    @ApiProperty()
    Empleoyeemai: string;
    @IsOptional()
    @IsObject()
    @ApiProperty()
    location:Location;
}

export class LocationEmployeeDTO extends Location{
    @ApiProperty()
    locationId: number;
    @ApiPropertyOptional()
    locationLat: number[];
    @ApiPropertyOptional()
    locationAddres: string;
}