
const Mock = require('./mockjs/index');
const resolveRoute = require('./script/resolveRoute')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const files = resolveRoute()
files.forEach(path => {
    const apis = require(path)
    Array.isArray(apis) && apis.forEach(api => {
        app[api.method || 'get'](api.url, (req, res) => {
            const data = typeof api.data === 'function' ? api.data(req) : api.data
            res.json(Mock.mock(data))
        })
    })
})

app.use((req, res, next) => {
    console.log(req.originalUrl)
    next()
})

app.listen(8848, () => {
    console.log('127.0.0.1:8848')
})