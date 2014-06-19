var http    = require('http');

var attrApi = require('./attrApi.js'),
    Nlog    = require('./nlog.js'),
    nlog    = new Nlog(180, 1); //暂时使用小区nlog id

var router  = require('./router.js');

//阻止进程因异常而退出
process.on('uncaughtException', function (e) {
    attrApi(366628);//worker进程发生异常
    nlog.fail(
        '[uncaught exception]: stack:%s',
        e.stack
    );
});

process.title = 'imweb_node_proxy';

var server = http.createServer(function (req, res) {

    attrApi(366629); // 业务进入量

    nlog.info('[client request]: %s->%s%s',
        req.connection.remoteAddress,
        req.headers.host,
        req.url
    );

    router.forward(req, res);
});

process.on("message", function(msg, socket) {
    process.nextTick(function () {
        if(msg == 'conn' && socket) {
            socket.readable = socket.writable = true;
            socket.resume();
            server.connections++;
            socket.server = server;
            server.emit("connection", socket);
            socket.emit("connect");
        }
    });
});