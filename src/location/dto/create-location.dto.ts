import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from "../entities/location.entity";
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
}
