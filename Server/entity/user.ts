import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { PrimaryColumn } from "typeorm";
import {Group} from './group'


@Entity()
export class User{
   // @Column()
    //id: number;
    //@Column()
    @PrimaryColumn()
    username : string;
    
    @Column()
    password : string;

    @ManyToMany(type=> Group)
    @JoinTable()
    groups: Group[];
}