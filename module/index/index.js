(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['template/common', 'template/index', 'common/ajax', 'common/deferred'],factory);
    } else {
        root['Index'] = factory(root['TmplInline_common'],root['TmplInline_index'], root['Ajax']);
    }
}(this, function (commonRender, indexRender, ajax, deferred) {
    function indexRouter(req, res) {

        var defer1 = deferred.create();
        var defer2 = deferred.create();
        var defer3 = deferred.create();
        var defer4 = deferred.create();
        var defer5 = deferred.create();
        var defer6 = deferred.create();
        var defer7 = deferred.create();

        var listObj = {};

        deferred.when(defer1, defer2, defer3, defer4, defer5, defer6, defer7).done(function(d1, d2){
            res.render('index', listObj);
        });
        function getLoveTop(req, res) {
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/course/get_love_top',
                succ: function (data) {

                    //渲染最受欢迎模版
                    listObj.pay_list = indexRender.love_list({
                        items: data.result.pay_items || []
                    });

                    // 添加数据上报标记 report-tdw
                    /*$('#js_pay_list .js-course-item').each(function(index, node){
                        var $node = $(this);
                        $node.find('.js-course-name').attr('report-tdw', 'action=pay-Rankingclass-clk&ver1='+data.result.pay_items[index].id);
                    });*/

                    listObj.free_list =indexRender.love_list({
                        items: data.result.free_items|| []
                    });
                    defer3.resolve('defer3 ok');
                    // 添加数据上报标记 report-tdw
                    /*$('#js_free_list .js-course-item').each(function(index, node){
                        var $node = $(this);
                        $node.find('.js-course-name').attr('report-tdw', 'action=free-Rankingclass-clk&ver1=' + data.result.free_items[index].id);
                    });*/
                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);
        }

        function renderAgencyList(req, res) {
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/tool/get_bottom_agency',
                param: {page: 1, count: 12},
                succ: function (data) {

                    var data = data.result,
                        html = '';
                    var def_count = 6;
                    for(var i = 0, len = Math.ceil(data.items.length / def_count); i < len; i++) {

                        var items = data.items.slice(i * def_count, (i + 1) * def_count);

                        html += '<ul class="market-list-mod">' + indexRender.agency_list({
                            items: items
                        }) + '</ul>';
                    }
                    listObj.agency_list = html;
                    defer1.resolve('defer1 ok');
                    //res.render('index', {agency_list: html});
                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);
        }

        function renderFeed(req, res){
            var hideName = function(name){

                return (name + '').substr(0,1) + "****";
            }
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/course/newest_apply',
                param: {count: 8},
                succ: function (data) {
                    var html = indexRender.feed_list(data.result || [], {hideName: hideName});
                    listObj.feed_list = html;
                    defer2.resolve('defer1 ok');

                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);
        }


        function renderLive(req, res){

            var def_count = 3;
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/course/live',
                param: {page: 1, count: 8},
                succ: function (data) {
                    var data = data.result,
                        html = '';
                    for(var i = 0, len = Math.ceil(data.items.length / def_count); i < len; i++) {

                        var items = data.items.slice(i * def_count, (i + 1) * def_count);

                        html += '<ul class="market-list-mod">' + commonRender.course_list({
                            items: items,
                            server_time: data.server_time,
                            tdws: {
                                enter: 'openclass-enter',
                                p: 'openclass-p',
                                t: 'openclass-t'
                            },
                            __from__: 'live'
                        }) + '</ul>';
                    }
                    listObj.live_list = html;
                    //console.log(html);
                    defer4.resolve('defer1 ok');

                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);

        }


        function renderHot(req, res){

            var def_count = 6;
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/course/hot_list',
                param: {page: 1, count: 12},
                succ: function (res) {

                    var data = res.result,
                        html = '';

                    for(var i = 0, len = Math.ceil(data.items.length / def_count); i < len; i++) {

                        var items = data.items.slice(i * def_count, (i + 1) * def_count);

                        html += '<ul class="market-list-mod">' + commonRender.course_list({
                            items: items,
                            server_time: data.server_time,
                            tdws: {
                                enter:'Hotclass-enter',
                                p: 'Hotclass-p',
                                t: 'Hotclass-t'
                            }
                        }) + '</ul>';
                    }
                    listObj.hot_list = html;
                    defer5.resolve('defer1 ok');

                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);
        }


        function renderNew(req, res){

            var def_count = 6;
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/course/hot_list',
                param: {page: 1, count: 12},
                succ: function (res) {

                    var data = res.result,
                        html = '';

                    for(var i = 0, len = Math.ceil(data.items.length / def_count); i < len; i++) {

                        var items = data.items.slice(i * def_count, (i + 1) * def_count);

                        html += '<ul class="market-list-mod">' + commonRender.course_list({
                            items: items,
                            server_time: data.server_time,
                            tdws: {
                                enter: 'Newclass-enter',
                                t: 'Newclass-t',
                                p: 'Newclass-p'
                            }
                        }) + '</ul>';
                    }
                    listObj.new_list = html;
                    defer6.resolve('defer1 ok');

                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);
        }
        //拉取最多课程的机构
        function renderMostHall(){
            var reqOpt = {
                host: 'ke.qq.com',
                path: '/cgi-bin/agency/get_most_course_top',
                succ: function (data) {

                    data.result.items = data.result.items || [];

                    //渲染机构模版
                    listObj.most_hall = indexRender.most_hall(data.result);
                    defer7.resolve('defer3 ok');
                    // 添加数据上报标记 report-tdw
                    /*$('#js_free_list .js-course-item').each(function(index, node){
                     var $node = $(this);
                     $node.find('.js-course-name').attr('report-tdw', 'action=free-Rankingclass-clk&ver1=' + data.result.free_items[index].id);
                     });*/
                },
                err: function (data) {res.send(data);}
            };
            ajax.doRequest(reqOpt);


        }
        renderAgencyList(req, res);
        renderFeed(req, res);
        getLoveTop(req, res);
        renderLive(req, res);
        renderHot(req, res);
        renderNew(req, res);
        renderMostHall(req, res);
    }

    return indexRouter;
}));
