(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/ajax','common/jquery'],factory);
    } else {
        root['DB'] = factory(root['Ajax']);
    }
}(this, function (ajax , $) {
    //console.log(ajax);

    function noop () {}
     //extend
    function extend(scope,args,ex){
        if(typeof(scope) != 'object') return scope;
        args = args || {};
        for(var i in args){
            var _fun,cb;
            if(ex && typeof(_fun = scope[i]) === 'function' && typeof(cb = args[i]) === 'function'){
                scope[i] = function(){
                    if(!cb.apply(scope,arguments)){//if the return is true,the current OnClientCall will not excute
                        _fun.apply(scope,arguments);//excute OnClientCall
                    }
                }
            }else{
                scope[i] = args[i];    //add window global callback function
            }
        }
    }

    return {
    	'status' : {
            //存储其他状态信息
            bkn : ''//页面的base_key信息，拉取base_key更新此字段
        },
        'data-cache' : {//data-cache

        },
        /**
         * @opt  obj {path:String,param:Object,type:String,isBkn:Boolean,cb:Function}
         * @description cgi请求统一处理,此处不包含拉取base_key cgi请求（单独处理）
         * @private
         * @path   {String} 请求地址,必选
         * @param    {Object} 请求传入参数
         * @type    {String} 请求方式 POST , GET,可选，默认是POST
         * @succ {Function} 成功，回调函数,可选
         * @err:  {Function} 失败，回调函数,可选
         * @returns undefined
         */
        cgiHttp : function(opt){
            //cgi请求
            if(!opt || !opt.path) return undefined;
            var _this = this;
            opt.param = opt.param || {};
            // just for test

            var callBack = function(data){
				//console.log(' Response of ' + opt.path + ' return ' , JSON.stringify(data));

                if ('retcode' in data) {
                    data.ec = data.retcode;
                } else {
                    data.retcode = data.ec;
                }
                var ec = data.retcode || data.ec;//('retcode' in data) ? data.retcode : data.ec;
                var errFlag = true;
                //if(typeof ec =="undefined") ec = 999;
                switch(ec){
                    case 0://成功
                       errFlag = false;
                       (opt.succ || function(){})(data);//执行成功回调函数
                       break;
                    case 111: // uin不存在，实际上应当也是失去登录态
					case -1001://自定义登录处理，没有登录态
                    case 100000: // 没有登陆态或登陆态失效或bkn失效
                    case 100021://需要验证登录，但是Bkn不存在，basekeyError                    	
                        //break;
                    case 100001://输入参数错误
                        //break;
                    case 100003://系统内部错误
                        //break;
					case -1000:
						ec = data.ec = 0;//兼容http abort之后 status 为0
						//break;
                    case 102404://没有找到机构记录信息
                    case 110403://没有找到机构的结算信息
                    case 106402://不能找到这个QQ号码
                    case 106401://不能找到这个群号
                    case 106407://账户状态错误
                    case 110403://没有找到机构的结算信息
                    case 110403://没有找到机构的结算信息
                    case 106407://账户状态是否ok
                    case 101404://没有找到课程记录信息
                    case 106411://报名的课程已经开始
                    case 106409://报名的课程已经结束
                    case 106410://报名的课程是收费的
                    case 101402://用户已经报名此课程
                    case 101404://没有找到课程记录信息
                    case 106409://报名的课程已经结束
                    case 106427://课程已经开始，不能取消报名
                    case 106416://用户取消报名的课程是支付课程，请走支付课程退款流程
                    case 106415://用户没有设置报名信息
                    case 101404://没有找到课程记录信息
                    case 101406://课程已经被下架
                    case 106415://用户没有报名此课程
                    case 101404://没有找到课程记录信息
                    case 106413://课程是免费，价格大于0
                    case 106412://课程是收费，价格不能为0
                    case 106413://课程是免费，价格大于0
                    case 106412://课程是收费，价格不能为0
                    case 106425://上传的图片大小不能是0
                    case 101404://没有找到课程记录信息
                    case 101406://课程已经被下架
                    case 101404://没有找到课程记录信息
                    case 101406://课程已经被下架
                    case 101404://没有找到课程记录信息
                    case 101406://课程已经被下架
                    case 103404://没有找到老师记录信息
                    case 106425://上传的图片大小不能是0
                    case 106403://错误的domain格式
                    case 106404://domain已经被绑定
                    case 106405://错误的key
                    case 106406://用户已经被绑定
                    case 101404://没有找到课程记录信息
                    case 101403://课程没有相关招生群
                    case 101405://课程没有这个招生群
					case 106457://课程赠送 根据uin未查到QQ号码
                        //break;
                    default://未知返回值
                        //break;
                }
                //新增底层统一处理跳转信息，没有管理权限

                if(errFlag){
                    var isBlockDefaultErr = (opt.err || function(){})(data);//执行失败回调函数
					
                }

            };

            var _opt = {};
            extend(_opt,opt);//集成变量
            _opt.succ = callBack;
            //console.log(_opt ,'=======');
            ajax.doRequest(_opt);
			
        },
    	//the default scope is commonapi, you can use the other scope like window for example this.extend('call',function(){console.log(3333,arguments;return false;);},window,true)
        //or this.extend({'call':function(){console.log(3333,arguments;return false;);}},window,true);
        extend : function(args, cb , scope ,ex){//scope
            //add function to this object
            var type = Object.prototype.toString.call(args);
            if(type === '[object String]'){
                scope = scope || this;
                var _args = {};
                _args[args] = cb;
                extend(scope, _args, ex);
            }else if(type === '[object Object]'){
                if((cb === null || cb === undefined) && arguments.length >= 4){
                    scope = scope || this;
                    extend(scope, args, ex);
                }else{
                    ex = scope;
                    scope = cb || this;
                    extend(scope, args, ex);
                }
            }
        },
        httpMethod: function (cfg) {

            var _this = this;

            return function (opt) {
                var _opt = {};
                if(cfg.param){
                    var _param = _opt.param = {};
                    extend(_param , cfg.param);
                    opt.param && extend(_param , opt.param);
                }else{
                    _opt.param = opt.param || {};
                }

                //默认采用全局参数
                cfg.type && (_opt.type = cfg.type);
                cfg.dataType && (_opt.dataType = cfg.dataType);
                cfg.noNeedLogin && (_opt.noNeedLogin = cfg.noNeedLogin);

                _opt.path = opt.path || cfg.path || opt.url || cfg.url;

                _opt.host = _opt.host || cfg.host || '10.213.111.104';//设置host
                _opt.headers = $.extend(cfg.headers || {} , {
                    'HOST' : 'ke.qq.com',
                    'Origin': 'http://ke.qq.com'
                })
                console.log(_opt); 
                _opt.succ = function(data){
                    return (cfg.succ || opt.succ || noop)(data);//调用回调函数
                };
                _opt.err = function(data){
                    return (cfg.err || opt.err || function(){})(data);//调用回调函数
                };
                return _this.cgiHttp(_opt);
            }
        },
        wrapGroup : function(param){
            //为整个项目增加公共参数
            return param || {};
        }
    }
}));
