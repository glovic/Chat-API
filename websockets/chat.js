// websockets/chat.js
const socketIO = require('socket.io');

const initChat = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('send_message', (data) => {
      // Emit the message to all users in the chat
      io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { initChat };

