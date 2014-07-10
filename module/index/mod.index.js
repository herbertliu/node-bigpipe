(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/db','template/common', 'template/index', 'common/deferred','index/db.index'],factory);
    } else {
        root['Index'] = factory(root['DB'], root['TmplInline_common'],root['TmplInline_index']);
    }
}(this, function (DB , commonRender, indexRender, deferred) {
    function indexRouter(req, res) {
        
        res.pipeLayout('index/index',{
            'pay_list' : res.pipeCreate('pagelet_pay_list'),
            'free_list' : res.pipeCreate('pagelet_free_list'),
            'agency_list' : res.pipeCreate('pagelet_agency_list'),
            'feed_list' : res.pipeCreate('pagelet_feed_list'),
            'live_list' : res.pipeCreate('pagelet_live_list'),
            'hot_list' : res.pipeCreate('pagelet_hot_list'),
            'new_list' : res.pipeCreate('pagelet_new_list'),
            'most_hall' : res.pipeCreate('pagelet_most_hall')
        });


        function getLoveTop(req, res) {
           DB.get_love_top({
                succ: function (data) {

                    //渲染最受欢迎模版
                    var pay_list = indexRender.love_list({
                        items: data.result.pay_items || []
                    });

                    res.pipePagelet('pagelet_pay_list', 'index/pagelet', {pay_list:pay_list});

                    // 添加数据上报标记 report-tdw
                    /*$('#js_pay_list .js-course-item').each(function(index, node){
                     var $node = $(this);
                     $node.find('.js-course-name').attr('report-tdw', 'action=pay-Rankingclass-clk&ver1='+data.result.pay_items[index].id);
                     });*/

                    var free_list =indexRender.love_list({
                        items: data.result.free_items|| []
                    });

                    res.pipePagelet('pagelet_free_list', 'index/pagelet', {free_list:free_list});

                    // 添加数据上报标记 report-tdw
                    /*$('#js_free_list .js-course-item').each(function(index, node){
                     var $node = $(this);
                     $node.find('.js-course-name').attr('report-tdw', 'action=free-Rankingclass-clk&ver1=' + data.result.free_items[index].id);
                     });*/
                },
                err: function (data) {
                    res.pipePagelet('pagelet_pay_list', 'index/pagelet', {pay_list:JSON.stringify(data)});
                    res.pipePagelet('pagelet_free_list', 'index/pagelet', {free_list:JSON.stringify(data)});
                }
            });
        }

        function renderAgencyList(req, res) {
            DB.get_bottom_agency({
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

                    res.pipePagelet('pagelet_agency_list', 'index/pagelet', {agency_list:html});

                },
                err: function (data) {
                    res.pipePagelet('pagelet_agency_list', 'index/pagelet', {agency_list:JSON.stringify(data)});
                }
            });
        }

        function renderFeed(req, res){
            var hideName = function(name){

                return (name + '').substr(0,1) + "****";

            }

            DB.newest_apply({
                param: {count: 8},
                succ: function (data) {
                    var html = indexRender.feed_list(data.result || [], {hideName: hideName});

                    res.pipePagelet('pagelet_feed_list', 'index/pagelet', {feed_list:html});


                },
                err: function (data) {
                    res.pipePagelet('pagelet_feed_list', 'index/pagelet', {feed_list:JSON.stringify(data)});
                }
            });

        }


        function renderLive(req, res){

            var def_count = 3;

            DB.live({
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

                    res.pipePagelet('pagelet_live_list', 'index/pagelet', {live_list:html});


                },
                err: function (data) {
                    res.pipePagelet('pagelet_live_list', 'index/pagelet', {live_list:JSON.stringify(data)});
                }
            });

        }


        function renderHot(req, res){

            var def_count = 6;
            DB.hot_list({
                param: {page: 1, count: 12},
                succ: function (data) {

                    var data = data.result,
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

                    res.pipePagelet('pagelet_hot_list', 'index/pagelet', {hot_list:html});

                },
                err: function (data) {
                    res.pipePagelet('pagelet_hot_list', 'index/pagelet', {hot_list:''});
                }
            });
        }

        function renderNew(req, res){

            var def_count = 6;
            DB.new_list({
                param: {page: 1, count: 12},
                succ: function (data) {

                    var data = data.result,
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
                    res.pipePagelet('pagelet_new_list', 'index/pagelet', {new_list:html});

                },
                err: function (data) {
                    res.pipePagelet('pagelet_new_list', 'index/pagelet', {new_list:JSON.stringify(data)});

                }
            });
        }
        //拉取最多课程的机构
        function renderMostHall(){
            DB.get_most_course_top({
                host: 'ke.qq.com',
                path: '/cgi-bin/agency/get_most_course_top',
                succ: function (data) {

                    data.result.items = data.result.items || [];

                    //渲染机构模版
                    var most_hall = indexRender.most_hall(data.result);
                    res.pipePagelet('pagelet_most_hall', 'index/pagelet', {most_hall:most_hall});
                },
                err: function (data) {
                    res.pipePagelet('pagelet_most_hall', 'index/pagelet', {most_hall:JSON.stringify(data)});
                }
            });


        }

        getLoveTop(req, res);
        renderAgencyList(req, res);
        renderFeed(req, res);
        renderLive(req, res);
        renderHot(req, res);
        renderNew(req, res);
        renderMostHall(req, res);

    }

    return indexRouter;
}));
