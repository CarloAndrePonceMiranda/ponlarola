'use strict'

// Importar bcrypt
var bcrypt = require('bcrypt-nodejs');

// Importar modelo
var User = require('../models/usuario');


//Prueba
function pruebas(req, res){
  res.status(200).send({
    mensaje: 'Probando una acción del controlador de usuario '
  });
}
//Crear usuario
function SaveUser(req, res) {
  var user = new User();
  var parametros = req.body

  console.log(parametros);

  user.nombre = parametros.nombre;
  user.apellido = parametros.apellido;
  user.email = parametros.email;
  user.role = 'ROLE_ADMIN';
  user.imagen = 'null';

  if (parametros.password) {
    // Encriptar Contraseña
    bcrypt.hash(parametros.password, null, null, function(err,hash){
      user.password = hash;
      if (user.nombre != null && user.apellido != null && user.email != null) {
        //Guardar Usuario
        user.save((err,userStored) => {
          if (err) {
            // enviar error
            res.status(500).send({mensaje:'Error al registrarse'});
          } else {
            if (!userStored) {
              // enviar error
              res.status(404).send({mensaje:'Usuario no Registrado'});
            } else {
              // enviar error
              res.status(200).send({usuario: userStored});
            }
          }
        });
      }else {
        // enviar error
        res.status(200).send({mensaje:'Introduce Todos los Campos'});

      }
    });

  }else {
    // enviar error
    res.status(200).send({mensaje:'Introduce la contraseña...'});
  }

}

// Exportar función
module.exports = {
  pruebas,
  SaveUser
};
