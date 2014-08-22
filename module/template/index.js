(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['../common/render'], factory);
    } else {
        root['TmplInline_index'] = factory();
    }
}(this, function ($) {
    return {
        'agency_info': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="qylogin-cont" > <div class="usercard"> <a class="user-head" href="agencyManage.html" target="_blank"> <img src="', cover_url, '" lazy-src="', cover_url, '"> <span class="border"></span> </a> <div class="user-name"> <a href="agencyManage.html" target="_blank" title="', nick_name, '" report-tdw="action=IA-Agencyname-clk">', nick_name, '</a> </div> <div class="user-welcome">Hello，你好！</div> </div> <div class="qylogin-tool-top"> <a href="agencyManage.html" target="_blank" class="icon icon-cl pngFix" id="index_agency_manage" report-tdw="action=IA-Agencymng-clk">机构管理</a> <a href="javascript:void(0)" class="icon icon-sy js_publish pngFix" id="index_agency_publish" report-tdw="action=IA-AgencyAlyclass-clk">发布新课程</a> </div> <div class="qylogin-tool-bottom"> <ul class="treeres-active"> <li class="treeres-item rb" onclick="window.open(\'/agencyManage.html#tab=showCourse\');" report-tdw="action=IA-Agencyclass-clk" id="auto_test_course"> <div class="treeres-num">', course_num, '</div> <div class="treeres-cat">课程</div> </li> <li class="treeres-item rb" onclick="window.open(\'/agencyManage.html#tab=showTeacher\');" report-tdw="action=IA-Agencytech-clk" id="auto_test_teacher"> <div class="treeres-num" id="total_teacher_num">', teacher_num, '</div> <div class="treeres-cat">老师</div> </li> <li class="treeres-item" onclick="window.open(\'/agencyManage.html#tab=showQqun\');" report-tdw="action=IA-Agencygrp-clk" id="auto_test_qun"> <div class="treeres-num" id="total_qqun_num">', group_num, '</div> <div class="treeres-cat">群</div> </li> </ul> </div></div><div class="rsl-bottom"> ', learning_sum >= 1000000 ? "超过&nbsp;" : "", '<span class="count">', learning_sum_format, '</span>&nbsp;人在腾讯课堂学习</div>');
                return _$out_.join('');
            }
        },
        'agency_list': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                for (var i = 0; i < items.length; i++) {
                    _$out_.push('<li class="business-item"><a target="_blank" href="http://', items[i].agency_domain, '" class="business-a" title="', items[i].agency_name, '" report-tdw="action=Agency-clk"><img src="', items[i].agency_url, '" lazy-src="', items[i].agency_url, '" /><span class="border"></span></a></li>');
                }

                return _$out_.join('');
            }
        },
        'feed_list': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                for (var i = 0; i < items.length; i++) {
                    _$out_.push('<li class="mod mod-1 ', i == items.length - 1 ? 'mod-8' : '', '"><div class="bm-menu-name"><span class="name">', opt.hideName(items[i].nick_name), '已报名</span><span class="bm-menu-time">', $.render.time.fromNowStr(items[i].reg_time, server_time), '</span></div><div class="bm-menu-more"> <a href="', $.render.url[items[i].showid == 2 ? 'video_play_page' : 'course_detail'](items[i].id), '" target="_blank" class="bm-menu-img" report-tdw="action=Applyfeed-p&ver1=', items[i].id, '"><img width="90" height="50" src="', items[i].cover_url, '90" lazy-src="', items[i].cover_url, '90" title="', items[i].name, '" alt="', items[i].name, '" />');
                    if (items[i].showid == 2) {
                        _$out_.push('<label class="play-button small"></label>');
                    }
                    _$out_.push('</a><div class="bm-menu-info"><p class="bm-menu-info-top"><a href="', $.render.url.course_detail(items[i].id), '" target="_blank" title="', items[i].name, '" report-tdw="action=Applyfeed-t&ver1=', items[i].id, '"><span>', items[i].name, '</span></a></p><p class="bm-menu-info-bottom"><span class="bm-menu-price">', $.render.price(items[i].price), '</span>');
                    if (items[i].showid == 2) {
                        _$out_.push(' ', (items[i].apply_num ? '<span>' + items[i].apply_num + '人观看</span>' : ''), ' ');
                    } else {
                        _$out_.push(' ', (items[i].apply_num ? '<span>' + items[i].apply_num + (items[i].price > 0 ? '人购买' : '人报名') + '</span>' : ''), ' ');
                    }
                    _$out_.push('</p></div><div class="clear"></div></div></li>');
                }

                return _$out_.join('');
            }
        },
        'love_list': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                for (var i = 0; i < Math.min(items.length, 5); i++) {
                    _$out_.push('<li class="rm-item js-course-item"> <div class="rm-sz ', i <= 1 ? 'hot' : '', '"><span>', i + 1, '</span></div> <div class="rm-cont"> <a href="', $.render.url.course_detail(items[i].id), '" target="_blank" class="rm-info js-course-name" title="', items[i].name, '">', items[i].name, '</a> <p class="rm-more"> <span class="rm-price">', $.render.price(items[i].price), '</span> <span class="rm-num"> ');
                    if (items[i].type == 2) {
                        _$out_.push(' ', (items[i].see_num ? items[i].see_num + '人观看' : ''), ' ');
                    } else {
                        _$out_.push(' ', (items[i].apply_num ? items[i].apply_num + (items[i].price > 0 ? '人购买' : '人报名') : ''), ' ');
                    }
                    _$out_.push(' </span> </p> </div></li>');
                }

                return _$out_.join('');
            }
        },
        'most_hall': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                for (var i = 0; i < items.length; i++) {
                    _$out_.push('<li class="rm-item"><div class="rm-img" report-tdw="action=Rankingagency-clk&ver1=', items[i].id, '"><a href="http://', items[i].agency_domain, '" target="_blank"><img src="', items[i].cover_url, '" lazy-src="', items[i].cover_url, '" /><a href="http://', items[i].agency_domain, '" target="_blank" class="border"></a></a></div><div class="rm-cont"><a href="http://', items[i].agency_domain, '" target="_blank" class="rm-info" title="', items[i].name, '" report-tdw="action=Rankingagency-clk&ver1=', items[i].id, '"><span>', items[i].name, '</span></a><p class="rm-more"><span class="rm-kenum" title="', $.render.summary(items[i].summary), '">', $.render.summary(items[i].summary), '</span></p></div></li>');
                }

                return _$out_.join('');
            }
        },
        'person_info': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                if (!is_login) {
                    _$out_.push('<div class="nologin-cont"> <div class="nologin-img pngFix"></div> <a href="javascript:void(0)" id="btn-login" class="btn-3" report-tdw="action=IA-Login-clk">登录</a></div>');
                } else {
                    _$out_.push('<div class="grlogin-cont"> <div class="usercard"> <a class="user-head" href="myCourse.html" target="_blank" id="index_person_img"> <img src="', face, '" lazy-src="', face, '"> <span class="border"></span> </a> <div class="user-name"> <a href="myCourse.html" target="_blank" title="', nick_name, '" id="index_person_nick" report-tdw="action=IA-studentname-clk">', nick_name, '</a> </div> <div class="user-welcome">Hello，你好！</div> </div> <div class="grlogin-tool"> <div class="grlogin-tool-top clearfix"> <a href="myCourse.html" target="_blank" class="icon icon-xl" id="index_person_course" report-tdw="action=IA-Studentclass-clk">课程表</a> <a href="myCourse.html#sid=fav" target="_blank" class="icon icon-sy" id="index_person_favcourse" report-tdw="action=IA-Studentcollect-clk">收藏的课程<span class="red-point hide">●</span></a> </div> <div class="grlogin-tool-bottom"> <span>最佳上课体验尽在新版QQ</span> <a href="http://im.qq.com/pcqq" target="_blank" class="btn-3" id="index_person_down" report-tdw="action=IA-Student-dl-clk">下载新版QQ</a> </div> </div></div>');
                }
                _$out_.push('<div class="rsl-bottom"> ', learning_sum >= 1000000 ? "超过&nbsp;" : "", '<span class="count">', learning_sum_format, '</span>&nbsp;人在腾讯课堂学习</div>');
                return _$out_.join('');
            }
        }
    };
}));