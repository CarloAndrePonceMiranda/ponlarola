'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Usuario
var ArtistSchema = Schema({
  nombre: String,
  descripcion: String,
  imagen: String,
});

// Exportar modelo
module.exports = mongoose.model('Artist',ArtistSchema);
