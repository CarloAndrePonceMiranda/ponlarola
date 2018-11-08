'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var CancionController = require('../controllers/cancion');

// Cargar el Router de express
var api = express.Router();

// Cargar Middleware de autenticación
var md_auth = require('../middlewares/authenticated');

// Enviar Archivos mediante HTTP y su Middleware
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/canciones'})

// Crear Rutas
api.get('/cancion/:id', md_auth.ensureAuth, CancionController.getCancion)
api.get('/canciones/:album?', md_auth.ensureAuth, CancionController.getCanciones)
api.post('/cancion', md_auth.ensureAuth, CancionController.saveCancion)
api.put('/cancion/:id', md_auth.ensureAuth, CancionController.updateCancion)
api.delete('/cancion/:id', md_auth.ensureAuth, CancionController.deleteCancion)
api.post('/upload-cancion-file/:id', [md_auth.ensureAuth, md_upload], CancionController.uploadCancion)
api.get('/get-cancion-file/:cancionFile', CancionController.getCancionFile)


// Exportar rutas
module.exports = api;
