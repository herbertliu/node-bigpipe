(function(){
    //数据上报
    function isd(pageId, userPoints){
        var pageId = pageId.split('-'), arr = [];

        for(var i = 0, len = pageId.length ; i < len ;i ++){
            arr.push('flag'+ (i + 1) +'=' + pageId[i]);
        }

        for(var t in userPoints){
            arr.push(t + '=' + userPoints[t]);
        }

        var src = 'http://isdspeed.qq.com/cgi-bin/r.cgi?' + arr.join('&');
        console.log(src);
        var image = new Image();
        image.src = src;
    }

    function timing() {
        if(!window['performance']) return;
        var timing = performance.timing,
            navStart = timing.navigationStart,
            basicTime = {},
            basicPoints = 'unloadEventStart－unloadEventEnd－redirectStart－redirectEnd－fetchStart－domainLookupStart－domainLookupEnd－connectStart－connectEnd－requestStart－responseStart－responseEnd－domLoading－domInteractive－domContentLoadedEventStart－domContentLoadedEventEnd－domComplete－loadEventStart－loadEventEnd'.split('－');
        var st = 1;
        for(var i = 0, len = basicPoints.length ; i < len ;i ++){
            basicTime[i+1] = Math.max(timing[basicPoints[i]] - navStart, 0) ;
        }

        isd('7832-39-41', basicTime);
    }
    timing();
})();