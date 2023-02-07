const express = require('express');
const http = require('http');
const cors = require('cors');
// const { Server } = require('socket.io');
const PORT = process.env.PORT || '3001';
const app = express();

app.use(cors);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const server = new Server({
//   cors: {
//     origin: ['http://localhost:3000'],
//   },
// });
