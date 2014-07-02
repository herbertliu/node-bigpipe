/**
 * @author fredwu
 * @date 2013-12-29
 * @description 登录组件
 * @param {Object} opt
    {
       needMask: true,   //是否需要蒙板, 默认为"true"
       mode: 'xui',      //支持降域（ui）和不降域(xui)两种登录模式，默认为"xui"不降域
       closeIcon: false, //是否需要右上角的关闭icon，默认为"false"不需要
       target: 'self',   //指定登录后的重定向的页面窗口（top|parent|self）,默认为“self”
       appid: 715030901, //业务向ptlogin2申请的ID,
       succUrl: 'url',  //成功跳转的url,需要业务encodeURIComponent，降域方式默认为“http：//ui.ptlogin2.qq.com/login_proxy.html”，
                        //非降域方式默认为："http://id.qq.com/login_proxy.html"
       proxyUrl: 'url'  //代理页面URL，用于在不降域的情况下页面与父页面在IE6/7下进行通信, ,需要业务encodeURIComponent，
                        //默认为“http://id.qq.com/login_proxy.html”，切记将proxy.html文件拷到站点的根目录下
   }
 * @example Login.show({succ: function () {console.log('login success')}})
 */

/**
 * jQuery全局事件抛出
 * login 登录成功
 * loginShow 登录框显示
 * loginCancel 登录框隐藏（并未登录）
 * logout 登录态丢失（这个处理在DB层）
 *        或主动登出（由于目前logout处理是reload页面，所以当前不触发该事件）
 * @example $(document).on('login', function () { console.log('login success') });
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root['Login'] = factory();
    }
}(this, function () {


    return {
        init: function () {},
        show: function () {},
        hide: function () {},
        logout: function () {},
        isLogin: function () {},
        uin: '',
        skey: ''
    };

}));

