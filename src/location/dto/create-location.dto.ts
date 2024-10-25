import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/region/entities/region.entity";
import { Manager } from "src/manager/entities/manager.entity";
export class CreateLocationDto extends Location {
    @MaxLength(35)
    @IsString()
    locationName:string;
    @IsString()
    @MaxLength(160)
    locationAddres:string;
    @IsArray()
    @ArrayNotEmpty()
    locationLat:number[]; 
    @IsObject()
    @IsOptional()
    region: Region;
    @IsUUID()
    @IsOptional()
    manager: string;
}
