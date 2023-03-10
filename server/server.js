const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = process.env.PORT || '8080';
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(socket.id);

  socket.on('join_room', (room, name) => {
    socket.join(room);
    socket.to(room).emit('room_joined', name);
    console.log(`${name} joined room: ${room}`);
  });

  socket.on('send_message', messageData => {
    socket.to(messageData.room).emit('receive_message', { username: messageData.username, message: messageData.message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
