import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/location/entities/location.entity";
import { Auth } from "src/auth/entities/user.entity";

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
    @OneToOne(()=> Auth)
    @JoinColumn({
        name: "userId"
    })
    user: Auth
}
