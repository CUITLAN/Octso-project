import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/location/entities/location.entity";
import { Auth } from "src/auth/entities/user.entity";

@Entity()
export class Empleoye {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;
    @Column('text')
    Empleoyename: string
    @Column('text')
    EmpleoyelastName: string
    @Column('text',{
        unique: true
    })
    EmpleoyePhoneNumber: string
    @Column('text',{
        unique: true
    })
    Empleoyeemail:string
    @Column({
        type:'text',
        nullable: true,
    })
    EmpleoyephotoUrl: string;

    @ManyToOne(() => Location, (location) => location.empleoyees)
    @JoinColumn({
        name: "LocationId"
    })
    location: Location | string;
    @OneToOne(()=> Auth)
    @JoinColumn({
        name: "userId"
    })
    user: Auth;
}
