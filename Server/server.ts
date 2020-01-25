import express from 'express';

const app = express();
const port = 2000;

// configure middleware
//app.use(bodyParser.json());
app.use(express.json());


//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users');
app.use('/groups')

app.get('/api/echo', (request,response)=>{
    response.send('Hello');
});

// define controller per route
// start server
app.listen(port, () => {
    console.log(`Listening at http://localhost:2000/`);
});
