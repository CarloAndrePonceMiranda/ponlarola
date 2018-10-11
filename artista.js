'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Usuario
var ArtistaSchema() = Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
});

// Exportar modelo
module.exports = mongoose.model('Artista',ArtistaSchema);
