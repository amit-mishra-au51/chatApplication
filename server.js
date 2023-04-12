const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/style.css",(req, res) => {
  res.sendFile(__dirname + "/style.css");
});

app.get("/client.js",(req, res) => {
  res.sendFile(__dirname + "/client.js");
});

app.get("/wassup.png",(req, res) => {
  res.sendFile(__dirname + "/wassup.png");
});


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  // socket.on("disconnect", () => {
  //   console.log(`User disconnected: ${socket.id}`);
  // });
  socket.on('message', (msg) =>{
    socket.broadcast.emit('message', msg)
  })
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on *:3000");
});
