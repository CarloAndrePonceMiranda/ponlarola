'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var UserController = require('../controllers/usuario');

// Cargar el Router de express
var api = express.Router();

// Cargar Middleware
var md_auth = require('../middlewares/authenticated');

// Crear Rutas
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.SaveUser)
api.post('/login', UserController.loginUser)
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser)

// Exportar ruta
module.exports = api;
