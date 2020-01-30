import { createConnection, getConnection } from "typeorm"
import {User} from '../entity/user'
import { Group } from "../entity/group"

export class Repository{
    public connection = createConnection({
        type: "mysql",
        host: "db",
        port: 3306,
        username: "root",
        password: "passme",
        database: "WhatsAppDB",
        entities: [User, Group],
        synchronize: true
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
            }).catch(er=> console.log(er))
        }).catch(er=> console.log(er))
    }

    public getUser(username : string) {
        const user = getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username = :username", {username: username})
        .getOne();

        return user;
    }

    public getGroupsOfUser(username : string) {
        const groups = getConnection()
        .createQueryBuilder()
        .select("group")
        .from(Group, "group")
        .innerJoin(User, "user")
        .where("user.username = :username", {username: username})
        .getMany();

        return groups;
    }

    public findAllUsers():Promise<User[]>{
        console.log("finde")
        let savedUsers = this.connection.then(con => {
            return con.manager.find(User);
        });
        return savedUsers;
    }

    public findAllGroups(){
        let savedGroups = this.connection.then( con => {
            return  con.manager.find(Group);
        });
        return savedGroups;
    }
}
