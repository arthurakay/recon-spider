const io = require('socket.io');

let ioServer;

/**
 *
 * @param httpServer
 */
function init(httpServer) {
    ioServer = io(httpServer);

    ioServer.on('connection', function(socket){
        console.log('a user connected');
    });
}

/**
 *
 * @param eventName
 * @param msg
 */
function sendMsg(eventName, msg) {
    ioServer.emit(eventName, msg);
}

module.exports = {
    sendMsg,
    init
};