(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function () {
    //TODO:服务器端jq
    return {};
}));
