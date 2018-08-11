const io = require('socket.io');

let ioServer;

function init(httpServer) {
    ioServer = io(httpServer);

    ioServer.on('connection', function(socket){
        console.log('a user connected');
    });
}

function sendMsg(eventName, msg) {
    ioServer.emit(eventName, msg);
}

module.exports = {
    sendMsg,
    init
};