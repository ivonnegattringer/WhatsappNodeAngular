import { createConnection, getConnection } from "typeorm";
import {User} from '../entity/user'
import { Group } from "../entity/group";

export class Repository{
    public connection = createConnection({
        type: "mysql",
        host: "172.20.0.2",
        port: 3306,
        username: "root",
        password: "passme",
        database: "WhatsAppDB",
        entities: [User, Group]
    });

    constructor(){
        this.initDatabase();
    }

    private initDatabase(){
        console.log("init Database");
        this.findAllUsers().then(data => {
            if(data.length != 0) return;
            this.connection.then(con=>{
                const group = new Group();
                group.groupname = "haus";
                con.manager.save(group);
                const group2 = new Group();
                group2.groupname = "schule";
                con.manager.save(group2);
                const group3 = new Group();
                group3.groupname = "kinder";
                con.manager.save(group3);
            
                const user1 = new User();
                user1.password = "abc";
                user1.username = "abc";
                user1.groups = [group,group2];
                con.manager.save(user1);
                console.log("inserted user: abc");
    
                const user2 = new User();
                user2.password = "juli";
                user2.username = "juli";
                user2.groups = [group,group2,group3];
                con.manager.save(user2);
                console.log("inserted user: juli");
    
                const user3 = new User();
                user3.password = "test";
                user3.username = "test";
                user3.groups = [group2,group3];
                con.manager.save(user3);
                console.log("inserted user: test");
    
                con.synchronize();
            })
        })
    }

    public async getUser(username : string) {
        const user = getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username = :username", {username: username})
        .getOne();

        return user;
    }

    public async getGroupsOfUser(username : string) {
        const groups = getConnection()
        .createQueryBuilder()
        .select("group")
        .from(Group, "group")
        .innerJoin(User, "user")
        .where("user.username = :username", {username: username})
        .getMany();

        return groups;
    }

    public async findAllUsers():Promise<User[]>{
        console.log("finde")
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
