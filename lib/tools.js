var crypto   = require('crypto');

function intToIp(number) {
    return (number >> 24) + "." +
        (number % (256*256*256) >> 16) + "." +
        (number % (256*256) >> 8) + "." +
        (number % 256);
}

function ipToInt(ip) {
    var result = ip.split('.');
    return result[0] * 0x1000000
        + result[1] * 0x10000
        + result[2] * 0x100
        + result[3] * 0x1;
}

exports.encryptVia = function (ip) {

    var md5 = new crypto.createHash('md5');
    md5.update("QV^10#Prefix");

    var buf = new Buffer(4);
    buf.writeUInt32BE(ipToInt(ip), 0);

    md5.update(buf);
    md5.update("QV10$Suffix%");
    return buf.toString('hex') +  md5.digest('hex') ;
}

exports.verifyVia = function (via) {
    if (!via || via.length !== 40) return false;

    var buf = new Buffer(4);
    buf.writeUInt32BE(parseInt(via.substring(0, 8), 16) ,0);

    var numIp = intToIp(buf.readUInt32BE(0));
    return via === this.encryptVia(numIp);
}

exports.extend = function extend(dst, src){
    if (arguments.length < 2) {
        return extend(this, dst);
    } else {
        dst = dst || {};
        for(var prop in src){
            dst[prop] = src[prop];
        }
    }
    return dst;
};

exports.encryptSkey = function (str) {
    if(!str){
        return "";
    }
    var hash = 5381;
    for(var i = 0, len = str.length; i < len; ++i){
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }
    return hash & 0x7fffffff;
};

/*k-v间用；分隔; k-v用=号分隔*/
exports.cookie2Object = function (str) {
	var obj = {};
	(str || '').split(';').forEach(function( kv ) {
		var parts = kv.split('=');
		obj[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
	});
	return obj;
};
