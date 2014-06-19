var http		= require('http'),
    zlib		= require('zlib'),
    queryString	= require('querystring'),
    undefined;

var attrApi     = require('./attrApi.js'),
    tools		= require('./tools.js'),
    Nlog        = require('./nlog.js'),
    nlog        = new Nlog(180, 1); //暂时使用小区nlog id

var config     = require('../conf/config.js');

function noop() {}

function Ajax(){
}

Ajax.prototype.doRequest = function (opt) {

    var reqOpt = {
        host: opt.host || '127.0.0.1',
        port: opt.port || 80,
        path: opt.path + (opt.param ? '?' + queryString.stringify(opt.param) : ''),

        method: (opt.type || 'GET').toUpperCase(),
        headers: opt.headers || {}
    };

    if (!tools.verifyVia(reqOpt.headers['qvia'])) {
        reqOpt.headers['qvia'] = tools.encryptVia(opt.req.socket.remoteAddress);
    }

    var request = http.request(reqOpt);

    request.setNoDelay(true);
    request.setSocketKeepAlive(false);

    opt.data && request.write(opt.data);

    opt.dataType = (opt.dataType || 'json');
    opt.err || (opt.err = noop);
    opt.succ || (opt.succ = noop);

    request.setTimeout(opt.timeout || config.ajaxTimeOut, function () {
        request.abort();
        attrApi(366632);//ajax请求超时
        nlog.error(
            '[ajax timeout]: %s%s -> %s timeout=%d',
            reqOpt.headers.host + (reqOpt.port !== 80 ? reqOpt.port : ''),
            reqOpt.path,
            reqOpt.host,
            opt.timeout || onfig.ajaxTimeOut
        );
        opt.err({ec: 900});
    });

    request.on('error', function (e) {
        request.abort();
        attrApi(366633);//ajax请求错误
        nlog.error(
            '[ajax error]: %s%s -> %s stack:%s',
            reqOpt.headers.host + (reqOpt.port !== 80 ? reqOpt.port : ''),
            reqOpt.path,
            reqOpt.host,
            e.message
        );
        opt.err({ec: 901});
    });

    request.on('response', function (response) {

        var result = [],
            pipe   = response;


        if (response.headers['content-encoding'] === 'gzip') {
            pipe = zlib.createGunzip();
            response.pipe(pipe);
        } else if (response.headers['content-encoding'] === 'deflate') {
            pipe = zlib.createInflate();
            response.pipe(pipe);
        }

        pipe.on('data', function (chunk) {
            result.push(chunk);
        });

        pipe.on('end', function () {
            var obj, responseText, buffer;

            if (response.statusCode !== 200) {
                attrApi(366634); //ajax响应码非200
                nlog.error(
                    '[ajax code error]: %s%s -> %s code:%d',
                    reqOpt.headers.host + (reqOpt.port !== 80 ? reqOpt.port : ''),
                    reqOpt.path,
                    reqOpt.host,
                    response.statusCode
                );
                opt.err({ec: response.statusCode});
                return;
            }

            buffer = Buffer.concat(result);

            if (opt.dataType === 'json' || opt.dataType === 'text' || opt.dataType === 'html') {
                responseText = buffer.toString('UTF-8');
            }

            if (opt.dataType === 'json') {

                try {
                    obj = JSON.parse(responseText);
                    opt.succ(obj);

                } catch (e) {
                    attrApi(366635);//ajax返回转json对象异常
                    nlog.error(
                        '[ajax json-package error]: %s%s -> %s stack:%s',
                        reqOpt.headers.host + (reqOpt.port !== 80 ? reqOpt.port : ''),
                        reqOpt.path,
                        reqOpt.host,
                        e.stack
                    );
                    opt.error({ec: 902});
                }

            } else {
                opt.succ(buffer);
            }

        });

        pipe.on('close', function () {
            attrApi(366636);//ajax连接被关闭
            nlog.error(
                '[ajax connect is closed]: %s%s -> %s',
                reqOpt.headers.host + (reqOpt.port !== 80 ? reqOpt.port : ''),
                reqOpt.path,
                reqOpt.host
            );
            opt.error({ec: 903});
        });

    });

    request.end();
};

module.exports = new Ajax;
