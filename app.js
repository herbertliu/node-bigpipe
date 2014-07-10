define(['bigpipe/BigPipe','express','routers/index'], function (BigPipe,express,routers) {
    var app = express.createServer();

    app.use(express.logger({ format: ':method :url :status' }));
    app.set('views', './views');
    app.set('view engine', 'ejs');
    app.set('view options', { layout: false });

 	routers(app);

    return app;
});