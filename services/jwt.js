'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'mi_pito_en_tu_cara';

exports.CreateToken = function (user) {
  var ita = {
    sub: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    role: user.role,
    imagen: user.imagen,
    iat: moment().unix(),
    vig: moment().add(30, 'days').unix
  };
  return jwt.encode(ita,secret)
};
