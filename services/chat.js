const { Server } = require("socket.io");
const User = require("./user");
var Users = new Array();

/**
 * 
 * @param {Server} io 
 */
function chat (io){
  

io.on('connection', (socket) => {  
  
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
 
  for (let [id, socket] of io.of("/").sockets) {
    Users.push(new User(socket.username,id ));
  }
  socket.emit("users", Users);

  Users.map(u=>{
    io.emit('chat message', 'User '+ u.name+' connected');})
  
  console.log(socket.id); // "G5p5..."
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
});}

module.exports = chat;
