import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/location/entities/location.entity";

@Entity()
export class Empleoye {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    name: string
    @Column('text')
    lastName: string
    @Column('text')
    phoneNumber: string
    @Column('text')
    email:string
    @Column({
        type:'text',
        nullable: true,
    })
    photoUrl: string;

    @ManyToOne(() => Location, (location) => location.empleoyees)
    @JoinColumn({
        name: "LocationId"
    })
    location: Location;
}
