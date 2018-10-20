const io = require('socket.io');

let ioServer;

/**
 *
 * @param httpServer
 */
function init(httpServer) {
    ioServer = io(httpServer);

    ioServer.on('connection', function(){
        console.log('a user connected');
    });
}

/**
 *
 * @param eventName
 * @param msg
 */
function sendMsg(eventName, msg = '') {
    console.log(`Emitting socket response for "${eventName}"`);
    ioServer.emit(eventName, msg);
}

function getServer() {
    return ioServer;
}

module.exports = {
    sendMsg,
    init,
    getServer
};