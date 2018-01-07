'use strict'
const { send } = require('micro')
const { router, get } = require('microrouter')
const onlyGet = require('micro-get')
const jwt = require('micro-jwt-auth')
const got = require('got')

module.exports = jwt(process.env.SECRET)(onlyGet(router(
  get('/', async (req, res) => {

    const response = await got(`${process.env.API_URL}/search/movie`, {
      json: true,
      query: {
        api_key: process.env.API_KEY,
        ...req.query
      }
    })

    const { headers } = response

    res.setHeader('x-ratelimit-limit', headers['x-ratelimit-limit'])
    res.setHeader('x-ratelimit-remaining', headers['x-ratelimit-remaining'])
    res.setHeader('x-ratelimit-reset', headers['x-ratelimit-reset'])

    send(res, response.statusCode, response.body)
  })
)))
