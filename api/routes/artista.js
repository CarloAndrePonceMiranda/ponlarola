'use strict'

// cargar express y el controlador de usuario
var express = require('express');
var ArtistController = require('../controllers/artista');

// Cargar el Router de express
var api = express.Router();

// Cargar Middleware de autenticación
var md_auth = require('../middlewares/authenticated');

// Enviar Archivos mediante HTTP y su Middleware
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./archivos/artistas'})

// Crear Rutas
api.get('/artista/:id', md_auth.ensureAuth, ArtistController.getArtist)
api.post('/artista', md_auth.ensureAuth, ArtistController.SaveArtist)
api.get('/artistas/:page?', md_auth.ensureAuth, ArtistController.getArtists)
api.put('/artista/:id', md_auth.ensureAuth, ArtistController.updateArtist)
api.delete('/artista/:id', md_auth.ensureAuth, ArtistController.deleteArtist)
api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage)
api.get('/get-image-artist/:imageFile', ArtistController.getImageFile)

// Exportar rutas
module.exports = api;
