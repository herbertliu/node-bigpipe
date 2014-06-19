var os      = require('os'),
    cp      = require('child_process'),
    net     = require('net');

var attrApi = require('./attrApi.js'),
    Nlog    = require('./nlog.js'),
    nlog    = new Nlog(180, 1); //暂时使用小区nlog id

var config  = require('../conf/config.js');

process.title = 'imweb_node_master';

//阻止进程因异常而退出
process.on('uncaughtException', function (e) {
    attrApi(366626); //master进程发生异常
    nlog.fail(
        '[uncaught exception]: stack:%s',
        e.stack
    );
 });

var workers = [];
var numCPU;


function startServer() {
    net.createServer(function(socket) {
        socket.pause();
        var worker = workers.shift();
        worker.send('conn', socket);
        workers.push(worker);
    }).listen(config.port);

    console.log("master is listening at port:'.", config.port);
}

function createWorkers() {
    numCPU = os.cpus().length;
    for (var i = 0; i < numCPU; i++) {
       workers.push(createWorker(i));
    }
}

function createWorker(id) {
    var worker = cp.fork(__dirname + '/proxy.js');
    worker.mid = id;
    worker.on('exit', function (exitCode, signal) {
        //子进程被杀死的时候做下处理，原地复活
        workers[id] = createWorker(worker.mid);
        attrApi(366627); //worker进程退出
        nlog.error('worker pid=%s has been killed. restart new worker again', worker.pid);

    });
    return worker;
}


(function main() {
    console.log("master is running, pid=", process.pid);
    createWorkers();
    startServer();
}());
