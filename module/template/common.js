(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/jquery'], factory);
    } else {
        root['TmplInline_common'] = factory();
    }
}(this, function ($) {
    return {
        'agency_list': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                $.each(agencys, function (i, item) {
                    _$out_.push('<li class="business-item"><a target="_blank" href="http://', item.agency_domain, '" class="business-a" title="', item.agency_name, '"><img src="', item.agency_url, '" lazy-src="', item.agency_url, '" /><span class="border"></span></a></li>');
                });

                return _$out_.join('');
            }
        },
        'clientShare': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="count-down-ctn"><p class="count-down-tips"><span class="count-down-got"></span><span class="count-down-count">5</span>秒后为您打开客户端</p><p>如果跳转失败，请<a href="', url, '" data-target="', url, '" class="count-down-manual nor-link">手动进入</a></p></div>');
                return _$out_.join('');
            }
        },
        'course_list': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];


                var srv_time = (typeof server_time) !== 'undefined' ? server_time : parseInt(new Date / 1000);
                var page_from = (typeof __from__) !== 'undefined' ? __from__ : '';


                for (var i = 0, len = items.length; i < len; i++) {


                    var item = items[i],
                        time = item.time,
                        endtime = item.endtime,
                        sub_bgtime = item.sub_bgtime || time,
                        sub_endtime = item.sub_endtime || endtime;



                    var is_live = (sub_bgtime <= srv_time && sub_endtime > srv_time),
                        is_over = (sub_endtime <= srv_time),
                        is_dianbo = (item.type == 2),
                        /*是点播课*/
                        is_free = (item.price == 0);
                    /*,
    is_not_applied = (!is_free && time <= srv_time);*/
                    /*是否展示进入课堂按钮：不是点播课，且是免费正在上课的才展示进入课堂按钮*/
                    var hasBtn = (item.type != 2) && is_live && is_free;

                    _$out_.push('<li class="mlm-item js-course-item"> <div class="course-card ', page_from == 'agencyIndex' || page_from == 'qqlive' ? 'course-card-for-agency' : '', ' ', hasBtn ? '' : 'course-card-nobtn', '"> ');
                    if (item.type == 2) {
                        _$out_.push(' <div class="course-face js-course-cover" ', typeof tdws !== 'undefined' && tdws.record_p && 'report-tdw="action=' + tdws.record_p + '&ver1=' + item.id + '"', '> ');
                    } else {
                        _$out_.push(' <div class="course-face js-course-cover" ', typeof tdws !== 'undefined' && tdws.p && 'report-tdw="action=' + tdws.p + '&ver1=' + item.id + '"', '> ');
                    }
                    _$out_.push(' <a href="', $.render.url[item.type == 2 ? 'video_play_page' : 'course_detail'](item.id), '" target="_blank" title="', item.name, '" data-cid="', item.id, '"> <img width="222" height="125" src="', item.cover_url, '222"  lazy-src="', item.cover_url, '222" /> <span class="border"></span> ');
                    if (item.type == 2) {
                        _$out_.push(' <span class="play-button normal"></span> ');
                    }
                    _$out_.push(' </a> ');
                    if (item.type != 2) {
                        _$out_.push(' <span class="course-time"> ');

                        var state;
                        if (is_over) {
                            state = '已结束';
                            /*} else if (is_not_applied) {
                        state = '截止报名';*/
                        } else if (is_live) {
                            state = '正在上课';
                        } else {
                            if (page_from == 'live') {
                                state = '倒计时：<span class="leave-time">' + $.render.time.fromStartTime(sub_bgtime, srv_time) + '</span>';
                            } else {
                                state = $.render.time.format(sub_bgtime, 1, srv_time);
                            }
                        }

                        _$out_.push(' ', state, ' </span> ');
                    }
                    _$out_.push(' </div> <div class="course-title"> ');
                    if (item.type == 2) {
                        _$out_.push(' <a href="', $.render.url.course_detail(item.id), '" target="_blank" title="', item.name, '" class="js-course-name" data-cid="', item.id, '" ', typeof tdws !== 'undefined' && tdws.record_t && 'report-tdw="action=' + tdws.record_t + '&ver1=' + item.id + '"', '>', item.name, '</a> ');
                    } else {
                        _$out_.push(' <a href="', $.render.url.course_detail(item.id), '" target="_blank" title="', item.name, '" class="js-course-name" data-cid="', item.id, '" ', typeof tdws !== 'undefined' && tdws.t && 'report-tdw="action=' + tdws.t + '&ver1=' + item.id + '"', '>', item.name, '</a> ');
                    }
                    _$out_.push(' </div> <div class="course-emphasis"> <span class="course-price"> ', $.render.price(item.price), ' </span> <span class="course-num"> ');
                    if (item.type == 2) {
                        _$out_.push(' ', (item.see_num ? item.see_num + '人观看' : ''), ' ');
                    } else {
                        _$out_.push(' ', (item.apply_num ? item.apply_num + (item.price > 0 ? '人购买' : '人报名') : ''), ' ');
                    }
                    _$out_.push(' </span> </div> <a class="course-agency nor-link" href="', $.render.url.agency_domain(item.agency_domain), '" title="', item.agency_name, '" target="_blank"> <span class="course-agency-icon"> <img width="20" height="20" src="', item.agency_cover_url, '"  lazy-src="', item.agency_cover_url, '" /> <span class="border"></span> </span> <span class="course-agency-name">', item.agency_name, '</span> </a> ');
                    if (is_live && is_free && item.type != 2) {
                        _$out_.push('<a href=\'', item.room_url, '\' data-target="', item.room_url, '" onclick="$.render.url.live(this);" ', ((item.room_url || '').indexOf('http') == 0 ? 'target="_blank"' : ''), ' class="btn-primary course-btn js-course-enter" data-cid="', item.id, '" ', typeof tdws !== 'undefined' && tdws.enter && 'report-tdw="action=' + tdws.enter + '&ver1=' + item.id + '"', '>进入课堂</a>');
                    }
                    _$out_.push(' </div></li>');
                }

                return _$out_.join('');
            }
        },
        'grid': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div id="', tableId, '" class="grid-wrap ', tableClass, '"> ');

                if (headers && headers.length > 0) {

                    _$out_.push(' <table cellpadding="0" cellspacing="0" class="grid-header-bg" > <thead> <tr> ');
                    for (var i = 0; i < headers.length; i++) {
                        var widthStr = headers[i].width ? ('style="width:' + headers[i].width + '"') : '';
                        var className = headers[i].className || '';

                        _$out_.push(' <th class="grid-header-', i + 1, ' ', className, '" ', widthStr, ' ><span>', headers[i].name, '</span></th> ');
                    }
                    _$out_.push(' </tr> </thead> </table> ');
                }
                _$out_.push(' <div class="grid-data-wrap"> <table cellpadding="0" cellspacing="0" class="grid-data" > <tbody> </tbody> </table> <div class="loading-wrap"></div> </div> <div class="grid-page-wrap sort-page"> </div></div>');
                return _$out_.join('');
            }
        },
        'grid_data': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                for (var i = 0; i < rows.length; i++) {
                    _$out_.push('<tr> ');
                    for (var j = 0; j < rows[i].length; j++) {
                        _$out_.push(' <td style="width:', colWidth[i], 'px">', td[i][j], '</td> ');
                    }
                    _$out_.push('</tr>');
                }

                return _$out_.join('');
            }
        },
        'modal': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="tips');
                if (dialog.globalClass) {
                    _$out_.push(' ', dialog.globalClass, '');
                }
                _$out_.push('"> <div class="tips-hd">', dialog.title, '</div> <a href="#" class="modal-close btn-close" title="关闭">×</a> <div class="tips-bd"> ');
                if (dialog.type) {
                    var ico_type = {
                        err: 'warn',
                        warn: 'info',
                        succ: 'succ',
                        help: 'help'
                    }[dialog.type] || 'info';

                    _$out_.push(' <div class="ico-', ico_type, '-large"></div> <p class="msg">', dialog.content, '</p> ');
                } else {
                    _$out_.push(' ', dialog.content, ' ');
                }
                _$out_.push(' </div> <div class="tips-tool"> ');
                if (dialog.confirm) {
                    _$out_.push(' <a href="#" title="', dialog.submit || '确定', '" class="btn-7 modal-accept');
                    if (dialog.extraClass) {
                        _$out_.push(' ', dialog.extraClass, '');
                    }

                    if (dialog.isDisabled) {
                        _$out_.push(' btn-disabled');
                    }
                    _$out_.push('">', dialog.submit || '确定', '</a><a href="#" title="取消" class="btn-8 modal-cancel">', dialog.cancel || '取消', '</a> ');
                } else {
                    _$out_.push(' <a href="#" title="', dialog.confirmText || '确定', '" class="btn-7 modal-accept">', dialog.confirmText || '确定', '</a> ');
                }
                _$out_.push(' </div></div>');
                return _$out_.join('');
            }
        },
        'more_agency': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="market-hd" style="padding-left:15px;margin-bottom:21px;"><span class="title">合作机构</span><a href="/applyLecture.html" target="_blank" class="more">机构入驻</a></div><div class="hz-menu-bd"> <a href="javascript:void(0)" class="pre-btn dis" title="上一页" id="js_agency_pre" style="display:none">上一页</a> <a href="javascript:void(0)" class="next-btn" class="下一页" id="js_agency_next" style="display:none">下一页</a> <div class="hz-menu-bd-inner slider" id="js_agency_cnt"> <ul class="business-list sliderbox" id="js_agency_list" style="width:3680px;"> ');
                TmplInline_common.agency_list({
                    agencys: agencys
                });
                _$out_.push(' </ul> <div class="clear"></div> </div></div>');
                return _$out_.join('');
            }
        },
        'page': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];

                if (total > 1) {
                    _$out_.push('<div class="page-box">');
                    if (total - 2 <= max) {
                        _$out_.push('<a href="javascript:void(0);" class="page-pre-btn page-btn-dis"><i class="page-btn-dis"></i></a><a href="javascript:void(0);" data-index="1" class="page-btn page-first">1</a>');
                        for (var i = 1, len = total; i < len; i++) {

                            if (i == len - 1) {
                                _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn page-last">', i + 1, '</a>');
                            } else {
                                _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn">', i + 1, '</a>');
                            }

                        }
                        _$out_.push('<a href="javascript:void(0);" class="page-next-btn"><i></i></a>');
                    } else {

                        if (from && to) {
                            _$out_.push('<a href="javascript:void(0);" class="page-pre-btn"><i></i></a><a href="javascript:void(0);" data-index="1" class="page-btn page-first">1</a><a href="javascript:void(0);" data-index="2" class="page-btn">2</a><span>…</span>');
                            for (var i = from, len = total; i < to; i++) {
                                _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn">', i + 1, '</a>');
                            }
                            _$out_.push('<span>…</span><a href="javascript:void(0);" data-index="', len - 1, '" class="page-btn">', len - 1, '</a><a href="javascript:void(0);" data-index="', len, '" class="page-btn page-last">', len, '</a><a href="javascript:void(0);" class="page-next-btn"><i></i></a>');
                        } else {

                            if (from) {
                                _$out_.push('<a href="javascript:void(0);" class="page-pre-btn page-btn-dis"><i class="page-btn-dis"></i></a><a href="javascript:void(0);" data-index="1" class="page-btn page-first">1</a><a href="javascript:void(0);" data-index="2" class="page-btn">2</a><span>…</span>');
                                for (var i = total - max, len = total; i < total; i++) {

                                    if (i == total - 1) {
                                        _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn page-last">', i + 1, '</a>');
                                    } else {
                                        _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn">', i + 1, '</a>');
                                    }

                                }
                                _$out_.push('<a href="javascript:void(0);" class="page-next-btn"><i></i></a>');
                            } else {
                                _$out_.push('<a href="javascript:void(0);" class="page-pre-btn page-btn-dis"><i class="page-btn-dis"></i></a><a href="javascript:void(0);" data-index="1" class="page-btn page-first">1</a>');
                                for (var i = 1, len = total; i < max; i++) {
                                    _$out_.push('<a href="javascript:void(0);" data-index="', i + 1, '" class="page-btn">', i + 1, '</a>');
                                }
                                _$out_.push('<span>…</span><a href="javascript:void(0);" data-index="', len - 1, '" class="page-btn">', len - 1, '</a><a href="javascript:void(0);" data-index="', len, '" class="page-btn page-last">', len, '</a><a href="javascript:void(0);" class="page-next-btn"><i></i></a>');
                            }

                        }

                    }
                    _$out_.push('</div>');
                }

                return _$out_.join('');
            }
        },
        'selectTerm': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="mod-course-banner__other-time', data.terms.length < 2 ? ' mod-course-banner__other-time_none' : '', '"> <i class="icon-calender-two-column"></i> <span>其他上课时间</span> <div class="mod-choose-time mod-choose-time_pop"> <i class="icon-triangle"></i> <ul> ');
                for (var i = 0, len = data.terms.length; i < len; i++) {
                    _terms = data.terms[i];

                    _$out_.push(' <li data-idx="', i, '" data-termid="', _terms.tid, '" class="mod-choose-time__li', i == currentIdx ? ' mod-choose-time__li_current' : '', '', i == len - 1 ? ' mod-choose-time__li_last' : '', '"> <i class="icon-green-flag"></i> <i class="icon-calender"></i> <span class="mod-choose-time__time" title="', _terms.parse_time, '">', _terms.parse_time, '</span> </li> ');
                }
                _$out_.push(' </ul> </div></div>');
                return _$out_.join('');
            }
        },
        'userinfo': function (it, opt) {
            it = it || {};
            opt = opt || {};
            with(it) {
                var _$out_ = [];
                _$out_.push('<div class="usercard"> <a class="user-head" href="', user.logoLink || 'http://ke.qq.com/myCourse.html#sid=course', '"> <img id="user-head" src="', user.logo, '" lazy-src="', user.logo, '"> <span class="border"></span> </a> <div class="user-name"> <a id="auto-test-userName" title="', user.nick_name, '" href="http://ke.qq.com/myCourse.html#sid=course" target="_blank">', user.nick_name, '</a> </div> <div class="user-welcome">Hello，你好！</div></div>');
                return _$out_.join('');
            }
        }
    };
}));