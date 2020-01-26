import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { PrimaryColumn } from "typeorm";
import {Group} from './group'


@Entity()
export class User{
   // @Column()
    //id: number;
    //@Column()
    @PrimaryColumn("varchar")
    username : string;
    
    @Column("varchar")
    password : string;

    @ManyToMany(type=> Group)
    @JoinTable()
    groups: Group[];
}