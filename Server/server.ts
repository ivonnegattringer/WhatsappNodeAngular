import * as express from 'express';
import { Repository } from './repository/respository';
import { User } from './entity/user';
import { request } from 'http';

var server = express();
var repo : Repository;
const port = 2000;

server.use(express.static('public'));
server.use(express.json());

server.get('/api/echo', (request, response) => {
    response.send("Success");
});

server.get('/get/user/', async  (request, response) => {
    console.log('Get Users');
    var username = request.query.username;
    var password = request.query.password;

    if(username == '' || password == ''){
        response.send('false');
    }
    
    repo.getUser(username).then(data => {
        console.log(data)
        if(data == null || data.password != password ){
            response.send('false');
        }
        else{
            response.send('true');
        }
    });
});

server.get('/get/groupsOfUser/:username', async (request, response) => {
    console.log('groups');
    var username = request.params.username;

    repo.getGroupsOfUser(username).then(data  => {
        var groups : Array<String> = [];
        for( var i = 0; i < data.length; i++){
            groups.push(data[i].groupname);
        }
        response.send(groups);
    })
})


server.listen(port, function(){
    console.log(`API is listening on port ${port}`);
    repo = new Repository();
});
