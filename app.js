'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Fecha/Hora del sistema sistema
var now= new Date();
var ahora = now.toDateString();
// Vigencia por n dias
var nowTemp=new Date();
var oneWeekAfter = new Date();
/* fecha + 7 dias */
oneWeekAfter.setDate(nowTemp.getDate()+7);
oneWeekAfter.getDate();
var noww = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), oneWeekAfter.getDate(), 0, 0, 0, 0);

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
  /* ACCESO A TODOS LOS METODOS HTTP */
  res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  res.header('Allow','GET, POST, PUT, DELETE, OPTIONS');

});

// Rutas Base
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', cancion_routes);

// Exportar app
module.exports = app;
