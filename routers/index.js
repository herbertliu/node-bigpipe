(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['index/mod.index'],factory);
    } else {
        root['Routers'] = factory();
    }
}(this, function (Index) {
    return function(app){
    	app.get('/', Index);
    	app.get('/index', Index);
    	app.get('/index.html', Index);
    }
}));
