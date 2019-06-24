module.exports = (io)=>{
  io.on('connection', (socket)=>{

    socket.on('joinRoom', (callback)=>{
      require('../sockets/joinRoom')(io, socket, callback);
    });

    socket.on('pairing', (data, callback)=>{
      require('../sockets/pairing')(socket, data, callback);
    });

    socket.on('sendMessage', (data, callback)=>{
      socket.to(socket.roomId).emit('receiveMessage', data);
      return callback()
    });

    socket.on('disconnect', ()=>{
      if (socket.roomId) {
        socket.to(socket.roomId).emit('partnerDisconnected');
      }
    });

    socket.on('leaveRoom', (callback)=>{
      delete socket.roomId;
      return callback();
    });
  })
}
