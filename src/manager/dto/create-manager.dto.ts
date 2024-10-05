import { IsNumber, IsObject, IsOptional, IsString, MAX_LENGTH, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/location/entities/location.entity";

export class CreateManagerDto extends Manager{
    @IsString()
    @MaxLength(100)
    managerFullName: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(12)
    managerPhoneNumber: string;
    @IsString()
    @MaxLength(100)
    managerEmail: string;
    @IsOptional()
    @IsObject()
    location : Location;

}
