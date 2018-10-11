'use strict'

// Variables
var mongoose = require('mongoose');

// Incorporar app.js
var app = require('./app');

// Configurar puerto
var port = process.env.PORT || 3997;

// Conección con MongoDB
mongoose.connect('mongodb://localhost:27017/ponlarola', (err, res) => {
  if (err) {
     throw err;
     console.error(err);
  }else{
    console.log('Database is Online')
    // Escuchar Puerto
    app.listen(port, function(){
      console.log('Server run in http://localhost:'+port);
    });
  }
})
