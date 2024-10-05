import { Empleoye } from "src/empleoyes/entities/empleoye.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Region } from "src/region/entities/region.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddres: string;
    @Column('simple-array')
    locationLat: number[];
    
    @OneToOne(()=> Manager,{
        eager:true
    })
    @JoinColumn({
        name: "ManagerId"
    })
    manager: Manager;

    @ManyToOne(()=> Region, (region)=> region.locations)
    @JoinColumn({
        name: "RegionId"
    })
    region: Region;

    @ManyToOne(()=> Empleoye, (empleoye)=> empleoye.location)
    empleoyees: Empleoye[]
}    
