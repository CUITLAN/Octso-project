import { IsNumber, IsString, MAX_LENGTH, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

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
}
