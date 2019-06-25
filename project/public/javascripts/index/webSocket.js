const socket = io.connect('http://localhost');
socket.on('connect', () => {
  console.log('Connected!');
});