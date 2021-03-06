const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const Response = require('./../components/response')

require('./dbSettings')()
require('dotenv').config()


app.use(express.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

require('../routers/recordFilteringRouter')(app)


app.use((req, res, next) => {
    new Response(res, {code: 3, message: "Route is not found "}).sendResponse()
    next();
});

app.use((err, req, res, next) => {

    if (res.headersSent) {
        return next(err)
    }
    const statusCode = err.status || 500;


    if (statusCode == 500) {
        new Response(res, {code: 3, message: err}).sendResponse();
    }
})

if (process.env.NODE_ENV != 'test') app.listen(process.env.PORT);

module.exports = app;