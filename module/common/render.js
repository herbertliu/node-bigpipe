/**
 * @fileoverview render工具函数，作用是？
 * @example @todo
*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/jquery', 'common/login'], factory);
    } else {
        factory(root['jQuery'], root['Login']);
    }
}(this, function ($, Login) {

$.render = {};

$.render.time = (function(){

	function fillZero(number){

		return ("0"+number).slice(-2,3);
	}

	//1：默认显示日期+时间
	//2: 显示日期
	//3: 显示时间
	function format(timestamp,type,server_time){

		type = type || 1;

		var now = server_time?new Date(server_time * 1000):new Date();
		var time = new Date(timestamp * 1000);

		var format_time = (time.getHours()) + ":" + fillZero(time.getMinutes());
		var format_date = "";

		//判断是否今天
		if(now.getFullYear() == time.getFullYear() && now.getMonth() == time.getMonth() && now.getDate() == time.getDate()){

			format_date = "今天";
		}
		else{

			format_date = ((time.getMonth()+1))+"月"+(time.getDate())+"日";
		}

		var weekdaymap = ['周日','周一','周二','周三','周四','周五','周六'];

		switch(type){
			case 1:
				return format_date + " " + format_time;
			case 2:
				return format_date;
			case 3:
				return format_time + ":" + fillZero(time.getSeconds());
			case 4: //2月20日 周四
				return formatDate('M月DD日',time) + ' ' + weekdaymap[time.getDay()];
            case 5: //昨天 一周内 更早
                return fromNow(time, now, '1-en');
            case 6: //2014-02-12 16:08
                return formatDate('YYYY-MM-DD hh:mm',time);
			default:break;
		}
	}

	//秒或分钟转为小时
	function changeHour(time){

		var hour = Math.floor(time / 60 / 60);
		var mins = Math.floor(time / 60 % 60);

		return hour + ":" + mins;
	}

	/**
     * @日期格式化
     *
     * @param {String} pattern 日期格式 (格式化字符串的符号参考w3标准 http://www.w3.org/TR/NOTE-datetime)
     * @param {Date Object} date 待格式化的日期对象
     * @return {String} 格式化后的日期字符串
     * @example
     *      formatDate("YYYY-MM-DD hh:mm:ss", (new Date()));
     */
     function formatDate(pattern,date){

        if(typeof date == 'number') date = new Date(date);

        function formatNumber(data,format){//3
            format = format.length;
            data = data || 0;
            //return format == 1 ? data : String(Math.pow(10,format)+data).substr(-format);//IE6有bug
            //return format == 1 ? data : (data=String(Math.pow(10,format)+data)).substr(data.length-format);
            return format == 1 ? data : String(Math.pow(10,format)+data).slice(-format);
        }

        return pattern.replace(/([YMDhsm])\1*/g,  function(format){
            switch(format.charAt()){
                case 'Y' :
                    return formatNumber(date.getFullYear(),format);
                case 'M' :
                    return formatNumber(date.getMonth()+1,format);
                case 'D' :
                    return formatNumber(date.getDate(),format);
                case 'w' :
                    return date.getDay()+1;
                case 'h' :
                    return formatNumber(date.getHours(),format);
                case 'm' :
                    return formatNumber(date.getMinutes(),format);
                case 's' :
                    return formatNumber(date.getSeconds(),format);
            }
        });
    }

    var fromNowTimeSepStyles = {
        '1': [
            [0,'今天'],
            [24*3600,'昨天'],
            [3*24*3600,'一周内'],
            [7*24*3600,'更早']
        ],
        '1-en': [
            [0,'today'],
            [24*3600,'yesterday'],
            [3*24*3600,'thisweek'],
            [7*24*3600,'earlier']
        ],
        '2': [
            [60,'刚刚'],
            [60*60,'$m分钟前'],
            [10*3600,'$h小时前'],
            [23*3600,'今天'],
            [24*3600,'昨天'],
            [2*24*3600,'前天'],
            [3*24*3600,'一周内'],
            [7*24*3600,'一周前'],
            [30*24*3600,'一个月前'],
            [3*30*24*3600,'三个月前'],
            [183*24*3600,'半年前'],
            [365*24*3600,'一年前']
        ]
    };

    function fromNow(time, now, style){
        style = style || 'default';
        now = now || new Date();
        time = new Date(time * 1000);

        if(now){
            now = new Date(now * 1000);
        }
        else now = new Date();

        var arr = fromNowTimeSepStyles[style] || fromNowTimeSepStyles['1'];

        var t = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
        if(time instanceof Date) time = time.getTime();

        var diff = t - time;

        var item,str;
        for(var i=0,len=arr.length;i<len;i++){
            item = arr[i];
            if(diff>item[0]*1000) str = item[1];
            else break;
        }

        return str;
    }

    function fromNowStr(time,now){

        time = new Date(time * 1000);
        now = now?new Date(now *1000):new Date();

        var diff = (now - time) / 1000;

        if(diff < 60)return "刚刚";

        if(diff < 60*60)return Math.floor(diff / 60) + "分钟前";

        if(diff < 24 * 3600)return Math.floor(diff / 3600) + "小时前";

        if(diff < 10 * 24 * 36000)return Math.floor(diff / 24 / 3600) + "天前";

        return "很久之前";
    }

    function fromStartTime(start,now){

        start = new Date(start * 1000);
        now = now?new Date(now *1000):new Date();

        var diff = (start - now) / 1000;

        if(diff < 0)return "已结束";
        if(diff < 60)return "1分钟";

        var hour = Math.floor(diff /3600);
        var mins = Math.ceil((diff - hour * 3600) / 60);

        var res = (hour?hour+"小时":"")+(mins?mins+"分钟":"");

        return res;
    }

    var t_delta_cache = {};
    /**
     * @获取课程的时间相关状态
     *
     * @param item {Object} 课程对象  一般直接传入cgi返回的课程对象即可(约束: 字段名需要cgi统一!)
     * @param result {result} 附加信息对象  一般直接传入cgi返回的result字段即可(主要是从中读取server_time这个信息)
     * @return ret {Object} 时间状态信息
     *    ret.ec                0 成功  1 参数错误(一般是item里字段不对)
     *    ret.status            0 正在直播  1 尚未开始  -1 已经结束
     *    ret.expired_str       过期课程的wording:  今天,昨天,一周内,更早
     *    ret.t_delta           判定时间时使用的参考时间偏移.
     * @example
     *      $.render.time.courseStatus(data.result.items[i],data.result);
     */
    function courseStatus(item, result){

        if(!item || !item.begintime || !item.endtime) return {ec:1};

        var t0 = item.begintime*1000;
        var t1 = item.endtime*1000;
        var t_now = new Date().getTime();


        var t_delta = 0;

        if(result && result.server_time){
            t_delta = (result.server_time*1000 + 100) - t_now;
        }
        else if(item.id && t_delta_cache[item.id]){
            t_delta = t_delta_cache[item.id];
        }

        if(t_delta>2000 || t_delta<-2000){//@magic_num: 2s内的误差忽略
           t_delta = 0;
        }

        if(item.id && t_delta){
            t_delta_cache[item.id] = t_delta;
        }

        t_now += t_delta;

        var status;

        if(t_now<t0) status = 1;
        else if(t_now>t1) status = -1;
        else status = 0;

        var rst = {
            ec:0,
            status: status
        };

        if(t_delta){
            rst.t_delta = t_delta;
        }

        if(status==-1){
            rst.expired_str = $.render.time.format(item.endtime, 5, Math.floor(t_now/1000));
        }

        return rst;

    }


	return {
		format : format,
		changeHour : changeHour,
		formatDate : formatDate,
        courseStatus: courseStatus,
        fromNow : fromNow,
        fromNowStr : fromNowStr,
        fromStartTime :fromStartTime
	};

})();



$.render.summary = function (summary) {
    return (summary || '').replace(/<br>/g, '');
}

$.render.qb = function (price) {
    var formatPrice = (price / 100).toFixed(1);
    return  (formatPrice != 0) ? (formatPrice + 'Q币').replace('.0', '') : '';
}


$.render.price = function(price, nounit , sgm, free){
	if(price === 0){
		if(free){
			return nounit?"0.00":"0.00元"
		}else{
			return "免费";
		}
	}else{
		if(!price){
			return "";
		}else{
			var formatPrice = (price / 100).toFixed(2);
			if(sgm){
				var priceArr = formatPrice.split(".");
				var yuan = priceArr[0].split("");
				var jiao = priceArr[1];
				var formatYuan = "";

				for(var len=yuan.length,i=len-1,j=0;i>=0;i--,j++){
					if(j%3==0 && j!=0){
						formatYuan = ","+formatYuan;
					}
					formatYuan = yuan[i] + formatYuan;
				}
				formatPrice = formatYuan+"."+jiao;
			}
			if(nounit){
				return formatPrice;
			}else{
				return formatPrice + '元';
			}
		}
	}
}

$.render.url = (function(){

    function encodeParam(k){

        k += "";
        var f = [];

        for(var i=0; i< k.length; i++){
            f.push(k.charCodeAt(i).toString(16).toUpperCase());
        }

        return f.join("");
    }

    function getURL(h, g, k, fuin){
        if(!h) return "";
        return "tencent://" + h + "/?subcmd=" + g + "&param=" + k + (fuin ? "&fuin=" + fuin : '');
    }

    function getEncodedURL(h, g, k, fuin){
        if(!h) return "";
        k = encodeParam(k);
        //console.log(getURL(h, g, k, fuin));

        return getURL(h, g, k, fuin);
    }

    /*
        appid:
            0           直接打开群aio
            21          群视频
            1101123802  群课程表
    */

    function getTencentURL(type, obj){

        var h,g,k;
        var t;

        switch(type){

            case 'all': //'all'+gc: 打开群  限制:公开群不在群内, 无法直接打开aio, 而是会弹加群窗口
                h = 'groupwpa';
                g = 'all';
                k = '{"groupUin":' + obj.gc + ', "timeStamp":1383552440}';
                break;
            case 'OpenGroup': //appid 0 打开公开群  限制:非公开群不再群内不会弹加群窗口,而是会弹"群主已将此群设置为非公开，加群后才能继续访问."
                h = 'groupwpa';
                g = 'OpenGroup';
                var appid = obj.appId || 0;
                k = '{"ExtParam":{"appId":'+appid+'},"groupUin":' + obj.guin + ',"visitor":1}';
                break;
            case 'VisitPublicGroup'://5.1以上才支持  限制:几乎无限制, 公开群/非公开群都表现正常(非公开群不在群内打开加群窗口,其他情况都能打开)
                h = 'VisitPublicGroup';
                g = 'VisitPublicGroup';
                k = '{"ExtParam":{"appId":"0"},"groupUin":' + obj.gc + ',"visitor":1}';
                // k = '{"ExtParam":{"appId":""},"groupUin":' + obj.gc + ',"groupuin":'+ obj.gc +',"visitor":1}';
                break;
            case 'CourseLive'://5.2以上才支持??
                h = 'VisitPublicGroup';
                g = 'VisitPublicGroupEx';
                k = '{"ExtParam":{"appId":"21","appParam":"{\\"CourseId\\":'+obj.courseId+'}"},"groupUin":'+obj.gc+',"visitor":1}';
                break;
        }

        if(h){
            var fuin = $.cookie.uin() || void(0);
            return getEncodedURL(h, g, k, fuin);
        }
        return '';
    }

    function getLoginQQNum() {
        var count = -1;
        try{
            if(window.ActiveXObject){//IE
                var q_hummerQtrl = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");
                var vInitData = q_hummerQtrl.CreateTXSSOData();
                q_hummerQtrl.InitSSOFPTCtrl(0, vInitData);
                var g_vOptData = q_hummerQtrl.CreateTXSSOData();
                var vResult = q_hummerQtrl.DoOperation(2, g_vOptData);
                var vAccountList = vResult.GetArray("PTALIST");
                count = vAccountList.GetSize();
            }else if(navigator.mimeTypes["application/nptxsso"]){
                var obj = document.createElement("embed");
                obj.type="application/nptxsso";
                obj.style.width="0px";
                obj.style.height="0px";
                document.body.appendChild(obj);
                if(obj.InitPVANoST()){
                    count = obj.GetPVACount();
                }
            }
        }catch(e){}
        return count;
    }



    return {
        /**
         * @课前讨论: 预期行为--打开课程对应的直播群-群课程应用
         *
         * @param courseId {Number} 课程id
         * @param gc {Number} 该课程的直播群群号(用户可见的群号)
         *
         * @example
         *      dom.html('<a href="'+$.render.url.live(item.id,item.live_room)+'">直播</a>');
         */
        /*live : function(courseId,gc,ext){
            return getTencentURL('CourseLive',{courseId:courseId,gc:gc});
        },*/
        live: function (liveTag) {

            var url = $(liveTag).attr('data-target'),
                isTencent = (url.indexOf('tencent') === 0);

            $(liveTag).attr('href', 'javascript:void(0);');
            if(isTencent && !$.bom.checkPlatform()) {
                return;
            }

            if(!Login.isLogin()){
                //$(liveTag).attr('href', 'javascript:void(0);');
                Login.show({succ: function () {	
					$(document).trigger("loginSucc");
                    setTimeout(function(){
						$(liveTag).click();
					},200);
                }});
                return;
            }

            if (isTencent && getLoginQQNum() === 0) {
                url = url.replace(/(&)?fuin=(\d)*/, '');
            }

            if(isTencent) {
                $(document).trigger('openQQClientLive', [liveTag]);
            }
			var uin=$.cookie.uin();
			if(url.indexOf("fuin")<0&&uin){
				//console.warn("有uin确没有带进tencent串里 url=["+url+"]");
				url=url+"&fuin="+uin;
			}
            window.open(url, isTencent ? '_self' : '_blank');
            //$(liveTag).attr('href', url);
        },
        /**
         * @课前讨论: 预期行为--打开课程对应的课前讨论群-群aio
         *
         * @param courseId {Number} 课程id, 目前的行为暂时用不上这个字段, 但既然有就传过来, 便于以后这里行为变更时各处修改
         * @param gc {Number} 该课程的讨论群群号(用户可见的群号)
         * @param ext {Object} 扩展信息字段, 会影响最终调用哪个tencent串
         *    ext.is_member  本用户是否是讨论群的成员
         *    ext.is_pub     讨论群是否是公开群
         *    ext.guin       讨论群的后台群唯一id(用户不可见)
         *
         * @example
         *      dom.html('<a href="'+$.render.url.discuss(item.id,item.discuss_room,item.discuss_ext||{})+'">课前讨论</a>');
         */
        discuss_old : function(courseId,gc,ext){

            var useOpen = true;

            if(ext.is_member) useOpen = false;
            else if(ext.is_pub && ext.guin) useOpen = true;
            else useOpen = false;

            if(useOpen){
                return getTencentURL('openGroup',{guin:ext.guin});
            }
            else{
                return getTencentURL('all',{gc:gc});
            }
        },
        discuss : function(courseId,gc,ext){

            var useOpen = true;
            
            if(ext && ext.is_member) useOpen = false;

            if(useOpen){
                return getTencentURL('VisitPublicGroup',{gc:gc});
            }
            else{
                return getTencentURL('all',{gc:gc});
            }
        },
        course_pay : function(courseId){
            return 'http://ke.qq.com/cgi-bin/courseDetail?course_id='+courseId+'&pay=1';
        },
        teacher_detail: function(teacherUin){
            return 'http://ke.qq.com/cgi-bin/teacher?tid='+teacherUin;
        },
        course_detail: function(courseId){
            return 'http://ke.qq.com/cgi-bin/courseDetail?course_id='+courseId;
        },
        video_play_page: function(courseId){
            return 'http://ke.qq.com/video/index.html?course_id='+courseId;
        },
        agency_detail: function(agencyId){
            return 'http://ke.qq.com/cgi-bin/agency?aid='+agencyId;
        },
		agency_domain: function(agencyDomain){
            return 'http://'+agencyDomain;
        }
    };

})();

$.render.courseTime = function (cycle_type, cycle_info) {
    var cycleTypeStr = ['', '每日 ', '每周 ', '每月 '],
        infoArr = cycle_info && cycle_info.replace(/[\[\]]/g, '').split(','),
        str = '';

    str += cycleTypeStr[cycle_type];

    switch(cycle_type) {
        case 1: str += "";
                break;
        case 2: var weekMapStr = '日一二三四五六日';//to review

                if(infoArr){
                    for(var i = 0, len = infoArr.length; i < len; i++){
                        infoArr[i] = weekMapStr[infoArr[i]];
                    }
                    str += infoArr.join("，");
                }
                break;
        case 3: var resultArr = [], tempArr = [], len, i;
                
                if(infoArr){
                    for(i = 0, len = infoArr.length; i < len; i++) {
                        if(i === 0) {
                            tempArr.push(infoArr[i]);
                            continue;
                        }

                        if(infoArr[i] - infoArr[i - 1] > 1) {
                            if(tempArr.length === 1) {
                                resultArr.push(tempArr + '日');
                            } else {
                                resultArr.push(tempArr[0] + '~' + tempArr.pop() + '日');
                            }
                            tempArr = [];
                        }

                        tempArr.push(infoArr[i]);
                    }
                    if(tempArr.length === 1) {
                        resultArr.push(infoArr[len - 1] + '日');
                    } else {
                        resultArr.push(tempArr[0] + '~' + tempArr.pop() + '日');
                    }

                    str += resultArr.join("，");
                }
                break;
        default: break;
    }
    return str;
};


    return $;
}));
