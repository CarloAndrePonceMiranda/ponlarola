'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var UserController = require('../controllers/usuario');

// Cargar el Router de express
var api = express.Router();

// Crear Rutas
api.get('/probando-controlador', UserController.pruebas)
api.post('/register', UserController.SaveUser)

// Exportar ruta
module.exports = api ;
