const path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    bodyParser = require('body-parser');

const Routes = require('./server/router/pageRoutes');

const app = express(),
    port = process.env.PORT || 3000;


app.listen(port, () => { console.log(`App is listening on port ${port}`) });

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