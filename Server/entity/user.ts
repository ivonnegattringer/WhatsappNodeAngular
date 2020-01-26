import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { PrimaryColumn } from "typeorm";
import {Group} from './group'


@Entity()
export class User{
   // @Column()
    //id: number;
    //@Column()
    @PrimaryColumn({type: "varchar2"})
    username : string;
    
    @Column({type: "varchar2"})
    password : string;

    @ManyToMany(type=> Group)
    @JoinTable()
    groups: Group[];
}