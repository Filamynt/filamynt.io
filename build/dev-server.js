require('dotenv').load()

const config = require('../config')

const path = require('path')
const axios = require('axios')
const express = require('express')
const webpack = require('webpack')
const bodyParser = require('body-parser')
const proxyMiddleware = require('http-proxy-middleware')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
const webpackConfig = ['testing', 'production'].includes(process.env.NODE_ENV)
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = process.env.NODE_ENV === 'development' && !!config.dev.autoOpenBrowser

const app = express()
const uri = 'http://localhost:' + port

// serve pure static assets
const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static(config.build.assetsRoot + staticPath))
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')())
app.use(bodyParser.json())
app.use(require('helmet')())

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

if (process.env.NODE_ENV === 'development') {
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
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      require('opn')(uri)
    }
    _resolve()
  })
}

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/../dist/index.html'))
})

const validateEmail = check('email').isEmail().withMessage('Sorry, we didn\'t catch that. Try again.').trim()
app.post('/subscribe', [validateEmail], (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({ error: errors.mapped().email.msg });
  }

  const uri = `${process.env.MAILCHIMP_URI}/lists/${process.env.MAILCHIMP_LIST_ID}/members`

  axios.post(uri, {
    email_address: request.body.email,
    status: "subscribed",
  }, {
    auth: { user: '', password: process.env.MAILCHIMP_API_KEY },
  }).then((res) => {
    return response.send(true)
  }).catch((error) => {
    return response.status(422).json({error: error.response.data.detail})
  })
})

const server = app.listen(port, () => {
  console.log(`listening at ${uri}...`)
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
