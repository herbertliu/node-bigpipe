(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function () {
	 //TODO:服务器端jq

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
        return scope;
    }

   
    return {
    	//the default scope is commonapi, you can use the other scope like window for example this.extend('call',function(){console.log(3333,arguments;return false;);},window,true)
        //or this.extend({'call':function(){console.log(3333,arguments;return false;);}},window,true);
        extend : function(scope , args, cb , ex){//scope
            //add function to this object
            var type1 = Object.prototype.toString.call(scope);
            var type2 = Object.prototype.toString.call(args);
            switch(arguments.length){
            	case 0:
            		return this;
            	case 1:
            		if(type1 !== '[object Object]'){
            			return this;
            		}else{
            			args = scope;
            			scope = this;
            		}
            		break;
            	case 2 :
            	case 3 :
            	case 4 :
            	default : 
            		if(type1 !== '[object Object]'){
            			return this;
            		}else{
            			if(type2 === '[object String]' && cb !==null && cb !== undefined){
            				var _args = {};
               				_args[args] = cb;
               				args = _args;
            			}else if(type2 !== '[object Object]'){
            				return scope;
            			}
            		}
            		break;
            }
            return extend(scope,args,ex);
        }
    };
}));
