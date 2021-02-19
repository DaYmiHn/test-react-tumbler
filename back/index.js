const path = require('path');
const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

let tumbler = true;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req,res) =>{
  if(process.env.NODE_ENV == 'production')
    res.sendFile(path.join(__dirname+'/build/index.html'))
  else 
    res.send('get /')
});

io.on('connection', (socket) => {

  socket.on('toogle', (data) => {
    io.sockets.emit('toogle', data);
    tumbler = data.value;
  });

  socket.on('getInitialState', (callback) => {
    callback(tumbler);
  })

});

http.listen(process.env.PORT || 5000, () => {
  console.log('listening on *:5000');
});