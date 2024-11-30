import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Location } from "src/location/entities/location.entity";
import { Auth } from "src/auth/entities/user.entity";
@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;
  @Column("text")
  managerFullName: string;
  @Column("float")
  managerSalary: number;
  @Column("text")
  managerEmail: string;
  @Column("text")
  managerPhoneNumber: string;

  @OneToOne(() => Location)
  @JoinColumn({
    name: "locationId",
  })
  location: Location | string;

  @OneToOne(() => Auth)
  @JoinColumn({
    name: "userId",
  })
  user: Auth;
}
