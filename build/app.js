require('dotenv').load()

const config = require('../config')

const path = require('path')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const proxyMiddleware = require('http-proxy-middleware')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port

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

require('./dev-setup')(app, uri)

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
