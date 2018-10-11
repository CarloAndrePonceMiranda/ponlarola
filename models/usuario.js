'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Modelo de Usuario
var UserSchema() = Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  role: String,
  imagen: String,
});

// Exportar modelo
module.exports = mongoose.model('User',UserSchema);
