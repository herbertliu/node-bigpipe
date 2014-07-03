(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/db'],factory);
    } else {
        root['DB'] = factory(ajax);
    }
}(this, function (DB) {
    DB.extend({
        get_love_top : DB.httpMethod({url:'/cgi-bin/course/get_love_top'}),
        get_bottom_agency : DB.httpMethod({url:'/cgi-bin/tool/get_bottom_agency'}),
        newest_apply : DB.httpMethod({url:'/cgi-bin/course/newest_apply'}),
        live : DB.httpMethod({url:'/cgi-bin/course/live'}),
        hot_list : DB.httpMethod({url:'/cgi-bin/course/hot_list'}),
        new_list : DB.httpMethod({url:'/cgi-bin/course/new_list'}),
        get_most_course_top : DB.httpMethod({url:'/cgi-bin/agency/get_most_course_top'})
    });
}));
