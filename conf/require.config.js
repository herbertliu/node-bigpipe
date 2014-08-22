

var requirejs = require('requirejs');
var __dirname = typeof(__dirname)!='undefined' ? __dirname : '';//linux or windows


var baseUrl = './';
if(__dirname && !/\\/.test(__dirname)){//非windows下
    baseUrl = __dirname.replace(/(\/)+conf(((\/)*)|$)/,'') + '/';
}

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    config : {
        "app" : {
            baseUrl : baseUrl
        }
    },
    nodeRequire: require,
    baseUrl: baseUrl,
    paths : {
        'routers':'./routers',
    	'common' : './module/common',
    	'template' : './module/template',
    	'index' : './module/index',
        'bigpipe' : './module/bigpipe'
    }
});

module.exports = requirejs;
