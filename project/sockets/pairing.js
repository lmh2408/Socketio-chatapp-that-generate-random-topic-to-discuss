module.exports = (socket, data, callback)=>{
  if (!socket.roomId) {
    socket.roomId = data.room;
    socket.leave('waitingRoom', ()=>{
      socket.join(socket.roomId, ()=>{
        return callback();
      });
    });
  }
  else {
    socket.disconnect(true);
  }
};
