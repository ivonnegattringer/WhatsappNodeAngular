import * as express from 'express';
import { Repository } from './repository/respository';
import { User } from './entity/user';

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
    
    var user = repo.findAllUsers().then(data => {
        return data.find(u => u.username == username && u.password == password);
    });
    console.log(user);
    if(user == null){
        response.send('false');
    }
    
    response.send('true');
});


server.listen(port, function(){
    console.log(`API is listening on port ${port}`);
    repo = new Repository();
});
