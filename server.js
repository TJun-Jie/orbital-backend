const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { databaseSource } = require('./config');
const cors = require('cors');
const dotenv = require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//can also use origin to specify domains
app.use(cors());
//enable pre-flight across the board
app.options('*', cors());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose
  .connect(databaseSource, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database Connected Successfully!!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // handle OPTIONS method
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});


app.listen(process.env.PORT || 8000, () => {
     if(process.env.PORT){
           console.log('listening on heroku port');

     } else {
       console.log('listening on 8000');
     }
 });

app.get('/', (req, res) => {
  res.json({ message: 'Hello Crud Node Express' });
});

const MealRoute = require('./routes/Meal');
const UserRoute = require('./routes/userRoutes');
const EventRoute = require('./routes/Event');

app.use('/api/meal', MealRoute);
app.use('/api/event', EventRoute);
app.use('/api/users', UserRoute);

//app.get(endpoint, callback) handle get request with get method
//./node_modules/.bin/nodemon server.js -> run this command
