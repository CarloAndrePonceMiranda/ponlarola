'use strict'

// Módulo de paginación
var mongoosePaginate = require('mongoose-pagination');

// Importar modelos
var Artista = require('../models/artista');
var Album = require('../models/album');
var Cancion = require('../models/cancion');

// Sistema de archivos y rutas
var fs = require('fs');
var path = require('path');

/* Métodos */
function getCancion(req,res) {
  var cancionId = req.params.id;

  Cancion.findById(cancionId).populate({path: 'album'}).exec((err,cancion)=>{
    if (err) {
      res.status(500).send({mensaje:'Error al buscar cancion 🎵❌'});
    } else {
      if (!cancion) {
        res.status(404).send({mensaje:'Error al buscar cancion 🎵⚠️'});
      }else {
        res.status(200).send({cancion,mensaje:'Cancion Encontrada ✅'});
      }
    }
  });
}

function getCanciones(req,res) {
  var albumId = req.params.album;
  if (!albumId) {
    var find = Cancion.find().sort('id')
  } else {
    var find = Cancion.find({album:albumId}).sort('numero');
  }
  find.populate({
    path:'album',
    populate:{
        path:'artista',
        model:'Artist'
    }
  }).exec(function(err,canciones){
    if (err) {
      res.status(500).send({mensaje: 'Error al buscar canciones ❌'});
    } else {
      if (!canciones) {
        res.status(404).send({mensaje: 'No se encontraron canciones ⚠️'});
      } else {
        res.status(200).send({canciones,mensaje: 'Success ✅'});
      }
    }
  });
}

function saveCancion(req, res) {
  var song = new Cancion();
  var params = req.body;

  song.nombre = params.nombre;
  song.album = params.album;
  song.numero = params.numero;
  song.archivo = 'null';

  song.save((err, songStored)=>{
    if (err) {
      res.status(500).send({mensaje:'Error del Servidor 🎵❌'});
    } else {
      if (!songStored) {
        res.status(404).send({mensaje:'Canción no encontrada 🎵⚠️'});
      } else {
        res.status(200).send({songStored, mensaje:'Canción guardada Correctamente ✅'});
      }
    }
  });
}

function updateCancion(req,res) {
  var cancionId = req.params.id;
  var update = req.body;

  Cancion.findByIdAndUpdate(cancionId, update, (err,cancionUpdated)=>{
    if (err) {
      res.status(500).send({mensaje:'Error del Servidor 🎵❌'});
    } else {
      if (!cancionUpdated) {
        res.status(404).send({mensaje:'Canción no encontrada 🎵⚠️'});
      }else {
        res.status(200).send({cancionUpdated, mensaje:'Canción actualizada Correctamente ✅'});
      }
    }
  });
}

function deleteCancion(req, res) {
  var albumId = req.params.id;
  Cancion.findByIdAndRemove(albumId, (err, cancionRemoved) => {
    if (err) {
      res.status(500).send({mensaje:'Error al Eliminar la canción ❌'});
    } else {
      if (!cancionRemoved) {
        res.status(404).send({mensaje:'La canción no existe ⚠️'});
      } else {
        res.status(200).send({cancion: cancionRemoved, mensaje:'Canción Eliminada Correctamente ✅'});
      }
    }
  });
}

// Cargar cancion
function uploadCancion(req,res) {
  var cancionId = req.params.id;
  var file_name = 'No subido';
  if (req.files) {
    var file_path = req.files.archivo.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    if (file_ext == 'mp3' || file_ext == 'm4a') {
      Cancion.findByIdAndUpdate(cancionId, {archivo: file_name}, function(err, cancionUpdated){
        if (err) {
          res.status(500).send({mensaje:'Error al Actualizar la Canción ❌'});
        } else {
          if (!cancionUpdated) {
            res.status(404).send({mensaje:'No se ah podido Actualizar canción ⚠️'});
          }else {
            res.status(200).send({cancion: cancionUpdated, mensaje:'Canción actualizada correctamente ✅'});
          }
        }
      });
    } else {
      res.status(200).send({ mensaje:'Por favor selecciona una Canción... ⚠️' });
    }
    console.log(ext_split);
  }else {
    res.status(200).send({ mensaje:'La canción no se ah subido ❌' });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var path_file = './archivos/albums/'+imageFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ mensaje:'La imagen no existe ❓' });
    }
  });
}
function getCancionFile(req, res) {
  var cancionFile = req.params.cancionFile;
  var path_file = './archivos/canciones/'+cancionFile;

  fs.exists(path_file, function(exists) {
    if (exists) {
      res.sendFile(path.resolve(path_file));
    } else {
      res.status(200).send({ mensaje:'La canción no existe ❓' });
    }
  });
}
// Exportar métodos
module.exports = {
  getCancion,
  saveCancion,
  getCanciones,
  updateCancion,
  deleteCancion,
  uploadCancion,
  getCancionFile
};
