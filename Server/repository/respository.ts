import { createConnection } from "typeorm";
import {User} from '../entity/user'
import { Group } from "../entity/group";

export class Repository{
    public connection = createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "passme",
        database: "WhatsAppDB",
        entities: [User]
    });

    constructor(){
        this.initDatabase();
    }

    private initDatabase(){
        this.findAllUsers().then(data=>{
            if(data.length == 0)return;
            this.connection.then(con=>{
                let group = new Group();
                group.groupname = "haus";
                con.manager.save(group);
                let group2 = new Group();
                group2.groupname = "schule";
                con.manager.save(group2);
                let group3 = new Group();
                group3.groupname = "kinder";
                con.manager.save(group3);
            
                let user1 = new User();
                user1.password = "abc";
                user1.username = "abc";
                user1.groups = [group,group2];
                con.manager.save(user1);
                console.log("inserted user: abc");

                let user2 = new User();
                user2.password = "juli";
                user2.username = "juli";
                user2.groups = [group,group2,group3];
                con.manager.save(user2);
                console.log("inserted user: juli");

                let user3 = new User();
                user3.password = "test";
                user3.username = "test";
                user3.groups = [group2,group3];
                con.manager.save(user3);
                console.log("inserted user: test");
            })
        })
    }

    public async findAllUsers():Promise<User[]>{
        let savedUsers = await this.connection.then(async con => {
            return await con.manager.find(User);
        });
        return savedUsers;
    }

    public async findAllGroups(){
        let savedGroups = await this.connection.then(async con => {
            return await con.manager.find(Group);
        });
        return savedGroups;
    }
}
