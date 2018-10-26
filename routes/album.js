'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var AlbumController = require('../controllers/album');

// Cargar el Router de express
var api = express.Router();

// Cargar Middleware de autenticación
var md_auth = require('../middlewares/authenticated');

// Enviar Archivos mediante HTTP y su Middleware
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/albums'})

// Crear Rutas
api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum)
api.post('/album', md_auth.ensureAuth, AlbumController.SaveAlbum)
api.get('/albums/:page', md_auth.ensureAuth, AlbumController.getAlbums)
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum)
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum)
api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage)
api.get('/get-image-album/:imageFile', AlbumController.getImageFile)

// Exportar rutas
module.exports = api;
