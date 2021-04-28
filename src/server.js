'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./errors/500.js');
const notHere = require('./errors/404.js');
const routeV1 = require('./basicRoutes.js')
// const routeV2 = require('./auth/routes.js')
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routeV1);
// app.use('/api/v2', routeV2);


app.use('*', notHere);
app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        if(!port){throw new Error("PORT Missing")}
        app.listen(port, () => console.log(`Up on port: ${port}.`))
    }
}