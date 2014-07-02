(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['common/ajax'],factory);
    } else {
        root['DB'] = factory(Ajax);
    }
}(this, function (Index) {
    
}));
