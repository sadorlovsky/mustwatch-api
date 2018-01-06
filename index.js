'use strict'
const { send } = require('micro')
const { router, get } = require('microrouter')
const onlyGet = require('micro-get')
const jwt = require('micro-jwt-auth')
const got = require('got')

module.exports = jwt(process.env.secret)(onlyGet(router(
  get('/', async (req, res) => {

    const response = await got(`${process.env.themoviedb_api_url}/search/movie`, {
      json: true,
      query: {
        api_key: process.env.themoviedb_api_key,
        ...req.query
      }
    })

    send(res, response.statusCode, response.body)
  })
)))
