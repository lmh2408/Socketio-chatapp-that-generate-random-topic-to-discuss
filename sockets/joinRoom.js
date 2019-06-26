var request = require('request');

module.exports = (io, socket, callback)=>{
  socket.join('waitingRoom', ()=>{

    io.in('waitingRoom').clients((err, clients)=>{

      if (clients.length > 1) {
        socket.leave('waitingRoom', ()=>{

          request('https://www.randomlists.com/data/words.json', (err, res, body)=>{
            if (err) { return callback(err) }

            var words = JSON.parse(body).data;
            var wordsKey = Object.keys(words);
            var r = getRandomInt(0, wordsKey.length);

            var data = {
              word: words[wordsKey[r]],
              room: socket.id + clients[0],
            };

            io.to(socket.id).to(clients[0]).emit('goToRoom', data);
            return callback();

          });
        });
      }

      return callback('wait');
    });
  });
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
