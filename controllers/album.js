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
function getAlbum(req,res) {
  var albumId = req.params.id;

  Album.findById(albumId).populate({path:'artista'}).exec((err,album) => {
    if (err) {
      res.status(500).send({mensaje: 'Error al buscar al album ❌'});
    } else {
      if (!album) {
        res.status(404).send({mensaje: 'Album no encontrado ⚠️'});
      } else {
        res.status(200).send({album, mensaje: 'Success ✅'});
      }
    }
  });
}

function getAlbums(req,res) {
  var artistId = req.params.artist;
  if (!artistId) {
    var find = Album.find().sort('titulo')
  } else {
    var find = Album.find({artista:artistId}).sort('fecha_lanzamiento');
  }
  find.populate({path:'artista'}).exec((err,albums)=>{
    if (err) {
      res.status(500).send({mensaje: 'Error al buscar albums ❌'});
    } else {
      if (!albums) {
        res.status(404).send({mensaje: 'No se encontraron albums ⚠️'});
      } else {
        res.status(200).send({albums,mensaje: 'Success ✅'});
      }
    }
  });
}

function SaveAlbum(req,res) {
  var album = new Album();
  var params = req.body;

  album.titulo = params.titulo;
  album.artista = params.artista;
  album.descripcion = params.descripcion;
  album.fecha_lanzamiento = params.fecha_lanzamiento;
  album.imagen = 'null';

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({mensaje: 'Error al guardar el Album ❌'});
    } else {
      if (!albumStored) {
        res.status(404).send({mensaje: 'El Album no fué guardado... ⚠️'});
      } else {
        res.status(200).send({ album: albumStored, mensaje: 'Album guardado exitosamente ✅'});
      }
    }
  });
}

function updateAlbum(req, res) {
   var albumId = req.params.id;
   var update = req.body;

   Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
     if (err) {
       res.status(500).send({mensaje:'Error al Actualizar el Album ❌♻️'});
     } else {
       if (!albumUpdated) {
         res.status(404).send({mensaje:'No se ah podido Actualizar el Album ⚠️'});
       }else {
         res.status(200).send({Artista: albumUpdated, mensaje:'Album Actualizado Correctamente ✅'});
       }
     }
   });
}
function deleteAlbum(req, res) {
  var albumId = req.params.id;
  Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
    if (err) {
      res.status(500).send({mensaje:'Error al Eliminar el Album ❌'});
    } else {
      if (!albumRemoved) {
        res.status(404).send({mensaje:'El Album no existe ⚠️'});
      } else {
        Cancion.find({album:albumRemoved._id}).remove((err,cancionRemoved) => {
          if (err) {
            res.status(500).send({mensaje:'Error al Eliminar el Cancion ❌'});
          } else {
            if (!albumRemoved) {
              res.status(404).send({mensaje:'No se encuentra(n) la(s) canción(es) ⚠️'});
            } else {
              res.status(200).send({cancion: cancionRemoved, mensaje:'Album y Canciones Eliminados Correctamente ✅'});
            }
          }
        });
      }
    }
  });
}


// Cargar imagen
function uploadImage(req,res) {
  var albumId = req.params.id;
  var file_name = 'No subido';
  if (req.files) {
    var file_path = req.files.imagen.path;
    var file_split = file_path.split('\/');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];
    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
      Album.findByIdAndUpdate(albumId, {imagen: file_name}, (err, albumUpdated) => {
        if (err) {
          res.status(500).send({mensaje:'Error al Actualizar el Album ❌♻️'});
        } else {
          if (!albumUpdated) {
            res.status(404).send({mensaje:'No se ah podido Actualizar el Album ❎'});
          }else {
            res.status(200).send({user: albumUpdated, mensaje:'Album Actualizado Correctamente ✅'});
          }
        }
      });
    } else {
      res.status(200).send({ mensaje:'Por favor selecciona una imagen... ⚠️' });
    }
    console.log(ext_split);
  }else {
    res.status(200).send({ mensaje:'La imagen no se ah subido ❌' });
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
// Exportar métodos
module.exports = {
  getAlbum,
  SaveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
};
