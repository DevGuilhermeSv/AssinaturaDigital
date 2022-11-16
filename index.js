const express = require('express');
const app = express();
const http = require('http');
var path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const auth = require('./services/auth')
var session = require('express-session')
var cookieParser = require('cookie-parser');

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const chat = require('./services/chat')


chat(io);

const indexRouter = require('./routes/index');


app.use('/',indexRouter);
app.use('/public',express.static(path.join(__dirname, 'public')));

module.exports = app;

server.listen(3000, () => {
  console.log('listening on *:3000');
});