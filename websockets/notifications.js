// websockets/notifications.js
io.on('new_friend_request', (data) => {
  socket.emit('notification', { message: 'New friend request received' });
});

