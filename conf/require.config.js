

var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,
    baseUrl: './',
    paths : {
        'routers':'./routers',
    	'common' : './module/common',
    	'template' : './module/template',
    	'index' : './module/index',
        'bigpipe' : './module/bigpipe'
    }
});

module.exports = requirejs;