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
var sessionMananger = session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false 
})
app.use(sessionMananger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const chat = require('./services/chat')
io.use((socket ,next)=>{
  sessionMananger(socket.request,{},next);
})
io.use((socket, next) => {
  const username = socket.request.session.userid;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});
chat(io);

const indexRouter = require('./routes/index');


app.use('/',indexRouter);
app.use('/public',express.static(path.join(__dirname, 'public')));

module.exports = app;

server.listen(3000, () => {
  console.log('listening on *:3000');
});