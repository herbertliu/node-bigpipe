(function(){
    var $ = window['$'] || window['Jquery'];
    if(!$){
        function Jquery(selector){
            if(Object.prototype.toString.call(selector) === '[object String]'){
                var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                var _match = selector.match(rquickExpr);
                if(_match && _match[2]){
                    this.ele = document.getElementById(_match[2]);
                }else{
                    this.ele = document.getElementById(selector);
                }    
            }else{
                this.ele = selector;
            }   
        }

        Jquery.prototype = {
            replaceWith : function(html){
                //var df = document.createDocumentFragment();
                var df = document.createElement('div');
                df.innerHTML = html;
                arg = this.ele.parentNode;
                if(arg){
                    var before = this.ele;
                    for(var len = df.childNodes.length - 1; len--;){
                        arg.insertBefore(df.childNodes[len],before);
                        before = before.previousSibling;
                    }
                    arg.removeChild(this.ele);
                }
            },
            html : function(html){
                this.ele.innerHTML = html;
            }
        }
        window['$'] = window['Jquery'] = function(selector){
            return new Jquery(selector);
        }
    }
})();