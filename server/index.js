const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const rooms = [];
let initiator = null;
let receiver = null;

io.on('connection', (socket) => {
  socket.emit('connection established', {success: true});

  socket.on('p2p offer', (data) => {
    if(receiver !== null){
      console.log('Call initiation request sent to peer');
      receiver.emit('offer request', data);
    } else {
      console.log('Call initiation FAILED');
    }
  });

  socket.on('p2p answer', (data) => {
    console.log('Call answer request recieved');
    if(initiator !== null){
      initiator.emit('answer request', data);
    } else {
      console.log('Call answer FAILED');
    }
  });

  socket.on('receiver registration', (data) => {
    console.log('receiver registration request received');
    receiver = socket;
  });
  socket.on('initiator registration', (data) => {
    console.log('initiator registration request received');
    initiator = socket;
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});