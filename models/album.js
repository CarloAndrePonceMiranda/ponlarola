'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Usuario
var AlbumSchema() = Schema({
  titulo: String,
  artista: { type: Schema.objectId, ref:'Artista' }, /* Referencia al objeto Artista */
  descripcion: String,
  fecha_lanzamiento: Number,
  imagen: String,
});

// Exportar modelo
module.exports = mongoose.model('Album',AlbumSchema);
