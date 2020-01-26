import * as express from 'express';
import { Repository } from './repository/respository';
import { User } from './entity/user';

var server = express();
const port = 2000;

server.use(express.static('public'));
server.use(express.json());


server.get('/api/echo', (request, response) => {
    response.send("Success");
});

server.get('/get/user/', async  (request, response) => {

    var username = request.query.username;
    var password = request.query.password;

    var repo = new Repository;
    var user = repo.findAllUsers().then(data => {
        data.find(u => u.username == username && u.password == password)
    });

    if(user == null){
        response.send('false');
    }
    
    response.send('true');
});


server.listen(port, function(){
    console.log(`API is listening on port ${port}`)
});
