'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var UserController = require('../controllers/usuario');

// Cargar el Router de express
var api = express.Router();

// Cargar Middleware
var md_auth = require('../middlewares/authenticated');

// Enviar Archivos mediante HTTP y su Middleware
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/usuarios'})

// Crear Rutas
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.SaveUser)
api.post('/login', UserController.loginUser)
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser)
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage)
api.get('/get-image-user/:imageFile', UserController.getImageFile)

// Exportar ruta
module.exports = api;
