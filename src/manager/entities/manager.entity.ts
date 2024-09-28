import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/location/entities/location.entity";
@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text')
    managerEmail:string;
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne(() => Location)
    location: Location;
}
