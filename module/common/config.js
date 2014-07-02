
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        factory();
    }
}(this, function () {
	return {
	    host: 'localhost' || '127.0.0.1',
	    port : 80
	}; 
}));