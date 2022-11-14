const express = require('express');
const app = express();
const http = require('http');
var path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const chat = require('./services/chat')


chat(io);

const indexRouter = require('./routes/index');


app.use('/',indexRouter);
app.use('/public',express.static(path.join(__dirname, 'public')));

module.exports = app;

server.listen(3000, () => {
  console.log('listening on *:3000');
});