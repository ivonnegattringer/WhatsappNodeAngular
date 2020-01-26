import * as express from 'express';

var server = express();
const port = 2000;

server.use(express.static('public'));
server.use(express.json());


server.get('/api/echo', (request, response) => {
    response.send("test");
});



server.listen(port, function(){
    console.log(`API is listening on port ${port}`)
});
