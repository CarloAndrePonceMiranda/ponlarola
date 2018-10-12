'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Usuario
var CancionSchema() = Schema({
  numero: String,
  nombre: String,
  archivo: String,
  album: { type: Schema.objectId, ref:'Album' }, /* Referencia al objeto Album */
  fecha_lanzamiento: Number,

});

// Exportar modelo
module.exports = mongoose.model('Cancion',CancionSchema);
