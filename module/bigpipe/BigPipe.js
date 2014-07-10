(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/jquery'],factory);
    } else {
        root['BigPipe'] = factory(Jquery);
    }
}(this, function ($) {
    function BigPipe (res, name) {
        res.pipeCount = res.pipeCount || 0;//当前的pagelet数量
        res.pipeMap = res.pipeMap || {};//pagelet名字
        if (res.pipeMap[name]) return;//对pagelet渲染判断
        res.pipeCount++;//没渲染一个pagelet数量增加
        res.pipeMap[name] = this.id = ['pipe', Math.random().toString().substring(2), (new Date()).valueOf()].join('_');//存储已渲染的pagelet
        this.res = res;//resonse
        this.name = name;//pagelet名字
    }

    var http = require('http'),
        response = http.ServerResponse.prototype;

    $.extend(response , {
        pipe : function (selector, html, replace) {
            this.write('<script>' + '$("' + selector + '").' +
                (replace === true ? 'replaceWith' : 'html') +
                '("' + html.replace(/"/g, '\\"').replace(/<\/script>/g, '<\\/script>') +
                '")</script>');//使用jq的replaceWith方法或者html方法
        },
        pipeCreate : function (name) {
            return new BigPipe(this, name);
        },
        pipeLayout : function (view, options) {
            var res = this;
            Object.keys(options).forEach(function (key) {
                if (options[key] instanceof BigPipe) options[key] = '<span id="' + options[key].id + '"></span>';
            })
            res.render(view, options, function (err, str) {
                if (err) return res.req.next(err);
                res.setHeader('content-type', 'text/html; charset=utf-8');
                res.write(str);
                if (!res.pipeCount) res.end();
            });
        },
        pipePagelet : function (name, view, options) {
            var res = this;
            res.render(view, options, function (err, str) {
                if (err) return res.req.next(err);
                res.pipe('#'+res.pipeMap[name], str, true);
                --res.pipeCount || res.end();
            })
        }
    });
}));
