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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar Cabeceras HTTP

// Rutas Base

app.get('/pruebas',function(req,res){
  res.status(200).send({mensaje:'Hello Word'});
});

// Exportar app

module.exports = app;