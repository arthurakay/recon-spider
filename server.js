const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    bodyParser = require('body-parser'),
    http = require('http');

const Routes = require('./server/router/pageRoutes'),
    socket = require('./server/socket');

const app = express(),
    port = process.env.PORT || 3000;

const httpServer = http.Server(app);
socket.init(httpServer);

app.use(bodyParser.json());
app.use('/', Routes);

let compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.resolve(__dirname, 'dist')));

httpServer.listen(port, function(){
    console.log(`App is listening on port ${port}`);
});