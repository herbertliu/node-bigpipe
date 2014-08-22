
requirejs = require('./conf/require.config');

requirejs(['app'],function(app) {
    app.listen(8080);
});