const express = require("express");
const createServer = require("node:http");
const {join} = require('path')
const chatServer = require("socket.io");

const clients = [];
const nicknames = [];
const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const httpServer = createServer.createServer(app);
const io = chatServer(httpServer);

app.use(express.static(join(__dirname, "public")));

io.on("connection", (socket) => {
  const ipaddress = socket.handshake.address;
  console.log(`Connected with ${ipaddress}`);
  console.log("1");
  socket.on("Message", (arg) => {
    io.emit("message", arg);
  });
 
  }); 

// io.emit("Nickname");

// io.on("nickname", (val, socket) => {
//     console.log("2");
//     console.log(val);
//     socket.data.username = val;
//     io.emit("message", `${val} joined!`);
//     io.emit("message", `${val} connected to the Server!`);
// });

// try {
// } catch (error) {
  //   index = clients.indexOf(socket);
  //   delete clients[index];
  //   socket.disconnect();
  //   const nickname = nicknames[index];
  //   io.emit(`${nickname} left!`);
  //   
  // }
io.on("disconnect", (socket) => {
  io.emit("message", `${socket.data.username} left!`);
  return;
})


app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "chat.html")); 
});

// app.get("/chat", (req, res) => {
// })

httpServer.listen(port, hostname);


