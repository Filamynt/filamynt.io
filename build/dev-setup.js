const config = require('../config')
const webpack = require('webpack')
const webpackConfig = ['testing', 'production'].includes(process.env.NODE_ENV)
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf')

module.exports = function (app, uri) {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    // automatically open browser, if not set will be false
    const autoOpenBrowser = process.env.NODE_ENV === 'development' && !!config.dev.autoOpenBrowser
    const compiler = webpack(webpackConfig)
    // serve pure static assets
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    })

    const hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false,
        heartbeat: 2000
    })
    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)

    console.log('> Starting dev server...')
    devMiddleware.waitUntilValid(() => {
        console.log(`> Listening at ${uri} \n`)
        // when env is testing, don't need open it
        if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
            require('opn')(uri)
        }
        // _resolve()
    })
}
