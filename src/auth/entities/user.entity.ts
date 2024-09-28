import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
   @PrimaryGeneratedColumn('uuid')
   userId: string;
   @Column('text')
   userEmail:string;
    @Column('text')
    userPassword: string;
}
