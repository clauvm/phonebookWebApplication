const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser'); // Body parser for api requests
const cors = require('cors'); // Handle CORS
const config = require('./config'); // Config variables
const docs = require('./config/swagger'); // Swagger configuration
const swaggerSpec = docs();


// routes
const indexRouter = require('./routes/index');
const contactRoute = require('./components/contact/contact.route');
const phoneNumberRoute = require('./components/phone_number/phone_number.route');

const app = express();

// app configuration

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

// serve swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


//API
app.use('/', indexRouter);
app.use('/contact', contactRoute);
app.use('/phoneNumber', phoneNumberRoute);


module.exports = app;
