'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar Rutas
var user_routes = require('./routes/usuario');
var artist_routes = require('./routes/artista');
var album_routes = require('./routes/album');
var cancion_routes = require('./routes/cancion');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar Cabeceras HTTP
app.use((req,res,next)=>{
  /* ACCESO A TODOS LOS DOMINIOS */
  res.header('Access-Control-Allow-Origin','*');
  /* ACCESO A TODAS LAS CABEZERAS */
  res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, ORIGIN, X-Requested-With, Content-Type, Accept', 'Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Headers','Content-Type');
  /* ACCESO A TODOS LOS METODOS HTTP */
  res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  res.header('Allow','GET, POST, PUT, DELETE');

  next();

});

// Rutas Base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', cancion_routes);

// Exportar app
module.exports = app;