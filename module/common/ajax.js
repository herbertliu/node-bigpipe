(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['http', 'zlib', 'querystring','common/config'], factory);
    } else {
        root['Ajax'] = factory();
    }
}(this, function (http, zlib, querystring,config) {

    //var config = {};


    function noop(){}

    //ajax方法，暂用该方法
    function Ajax(){

    }

    Ajax.prototype.doRequest = function (opt) {
        if(!opt.path) return

        var reqOpt = {
            host: opt.host || config.host,
            port: opt.port || config.port,
            path : opt.path,
            method: (opt.type || 'GET').toUpperCase(),
            headers: opt.headers || {'Referer': 'http://ke.qq.com/index.html'}
        };

        var postData = '';

        if(opt.param){
            var _param = querystring.stringify(opt.param);
            if(reqOpt.method == 'GET'){
                reqOpt.path = opt.path + (_param ? '?' + _param : '');
            }else{
                postData = _param;
            }   
        }
        console.log(reqOpt);
        var request = http.request(reqOpt);

        //console.log(request);

        request.setNoDelay(true);
        request.setSocketKeepAlive(false);

        postData && request.write(postData);

        opt.dataType = (opt.dataType || 'json');
        opt.err || (opt.err = noop);
        opt.succ || (opt.succ = noop);

        /*request.setTimeout(opt.timeout || config.ajaxTimeOut, function () {

        });*/

        request.on('error', function (e) {

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

                    opt.err({ec: response.statusCode});
                    return;
                }

               // console.log(reqOpt);

                buffer = Buffer.concat(result);

                if (opt.dataType === 'json' || opt.dataType === 'text' || opt.dataType === 'html') {
                    responseText = buffer.toString('UTF-8');
                }
                //console.log(responseText);

                if (opt.dataType === 'json') {
                    var obj = {};
                    try{
                        obj = JSON.parse(responseText);
                        opt.succ(obj);
                    }catch(e){
                        opt.err({ec: response.statusCode,text:responseText});
                    }
                } else {
                   opt.succ(buffer);
                }

            });

            pipe.on('close', function () {

            });

        });

        request.end();
    };

   return new Ajax;
}));
