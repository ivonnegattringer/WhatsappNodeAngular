import { Entity, Column } from "typeorm";
import { PrimaryColumn } from "typeorm";


@Entity()
export class Group{
   // @Column()
    //id: number;
    //@Column()
    @PrimaryColumn()
    groupname : string;
}