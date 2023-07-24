const express = require('express');
const appRoot = require('app-root-path');
const cookieParser = require('cookie-parser')

let configViewEngine = (app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser()); 
    app.use('/public', express.static(appRoot + '/src/public'));
}

module.exports = configViewEngine;