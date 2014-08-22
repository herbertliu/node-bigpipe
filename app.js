define(['bigpipe/BigPipe','express','routers/index','module'], function (BigPipe,express,routers,module) {
    var app = express.createServer();
    console.log(this) ;
    var _config = module.config() || {},
    	baseUrl = _config.baseUrl || './';

    console.log('The value of Object config is',_config);
    console.log('The value of variable baseUrl is "' + baseUrl + '"');

    app.use(express.logger({ format: ':method :url :status' }));

    app.use('/js',express.static(baseUrl + 'public/js'));
    app.use('/css',express.static(baseUrl + 'public/css'));

    app.set('views', baseUrl + 'views');
    app.set('view engine', 'ejs');
    app.set('view options', { layout: false });

 	routers(app);

    return app;
});