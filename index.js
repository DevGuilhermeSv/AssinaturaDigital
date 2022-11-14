const express = require('express');
const app = express();
const http = require('http');
var path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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