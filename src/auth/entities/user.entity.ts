import { Empleoye } from "src/empleoyes/entities/empleoye.entity";
import { Manager } from "src/manager/entities/manager.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
   @PrimaryGeneratedColumn('uuid')
   userId: string;
   @Column('text',{
    unique: true
   })
   userEmail:string;
    @Column('text')
    userPassword: string;
    @Column('simple-array',{
        default: "Employee"
    })
    userRoles: string[];
    @OneToOne(() => Manager)
    manager: Manager;
    @OneToOne(()=> Empleoye)
    empleoye: Empleoye;
}
