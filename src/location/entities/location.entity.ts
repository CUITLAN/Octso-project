import { Empleoye } from "src/empleoyes/entities/empleoye.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Region } from "src/region/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    @ApiProperty({
        default: "Ocso Juriquilla"
    })
    locationName: string;
    @Column('text')
    @ApiProperty({
        default: "Buenavista, S/N"
    })
    locationAddres: string;
    @Column('simple-array')
    @ApiProperty({
        default: [12, 16]
    })
    locationLat: number[];
    
    @OneToOne(()=> Manager,{
        eager:true
    })
    @JoinColumn({
        name: "ManagerId"
    })
    manager: Manager | string;

    @ManyToOne(()=> Region, (region)=> region.locations)
    @JoinColumn({
        name: "RegionId"
    })
    region: Region;

    @ManyToOne(()=> Empleoye, (empleoye)=> empleoye.location)
    empleoyees: Empleoye[]
}    
