var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/' , express.static(__dirname + '/'));		//Used to serve the current folder as /

/*app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});*/


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('card submit', function(data){
    console.log('Card Submitted with Title : ' + data.title);
	io.emit('card submit' , data);
  });
});

http.listen(8000, function(){
  console.log('listening on *:8000');
});
