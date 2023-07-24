const express = require('express');
const app = express();
const configViewEngine = require('./config/viewEngine');
const modules = require('./modules/index');
const connectDB = require('./config/connectDB');
const cronJob = require('./ulti/cronJob');
require('dotenv').config();
const port = process.env.PORT || 3000;

configViewEngine(app);
modules(app);
connectDB();

app.listen(port, () => {
    console.log('listening on port' + port);
})