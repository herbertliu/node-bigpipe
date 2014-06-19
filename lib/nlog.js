var nlog = require('../lib/nlog');
var util = require('util');

function Nlog(appId, modId) {
    this.appId = appId || 0;
    this.modId = modId || 0;
}

Nlog.prototype= {
    debug: function (format, arg1, arg2, arg3) {
        var msg = util.format.apply(this, arguments);
        nlog.record(this.appId, this.modId, 1, module.parent.filename, 0, msg);
    },
    info: function (format, arg1, arg2, arg3) {
        var msg = util.format.apply(this, arguments);
        nlog.record(this.appId, this.modId, 2, module.parent.filename, 0, msg);
    },
    error: function (format, arg1, arg2, arg3) {
        var msg = util.format.apply(this, arguments);
        nlog.record(this.appId, this.modId, 4, module.parent.filename, 0, msg);
    },
    fail: function (format, arg1, arg2, arg3) {
        var msg = util.format.apply(this, arguments);
        nlog.record(this.appId, this.modId, 8, module.parent.filename, 0, msg);
    }
};

module.exports = Nlog;

