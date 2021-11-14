const express		= require('express');
const path			= require('path');
const bodyParser	= require('body-parser');
const cookieParser	= require('cookie-parser');
const cors			= require('cors');
const logger		= require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
