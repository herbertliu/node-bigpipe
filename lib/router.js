var attrApi     = require('./attrApi.js'),
    Nlog        = require('./nlog.js'),
    nlog        = new Nlog(180, 1); //暂时使用小区nlog id

var routerTable = require('../conf/routerTable.js');

function notFound(req, res) {
    res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
    res.end('您尝试访问的页面不存在');
}

exports.forward = function (req, res) {
	var domain = req.headers.host;
	if (routerTable[domain]) {
        try {
            require(routerTable[domain])(req, res);
        } catch (e) {
            attrApi(366631); //业务模块内部异常
            nlog.fail(
                '[uncaught exception]: stack:%s',
                e.stack
            );
            //要加返回内容
        }

	} else {
        attrApi(366630);//未知请求
        nlog.error(
            '[router match failure]: %s->$s%s',
            req.connection.remoteAddress,
            req.headers.host,
            req.url

        );
		notFound(req, res);
	}
}
