var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/views/index.html');
} );

app.get('/admin', function(req, res, next) {
  res.sendFile(__dirname + '/views/admin.html');
} );

app.get('/create', function(req, res, next) {
  res.sendFile(__dirname + '/views/create-card.html');
} );

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('card submit', function(data){
    console.log('Card Submitted with Title : ' + data.title);
	io.emit('card submit' , data);
  });
});

var server_port = process.env.PORT || 8000;

http.listen(server_port, function(){
  console.log('listening on *:%d', server_port);
});
