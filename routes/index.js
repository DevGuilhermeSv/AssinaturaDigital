const { json, query } = require('express');
var express = require('express');
const DataObject = require('../models/DataObject');
const Keys = require('../models/Keys');
const RSA = require('../services/RSAService');
var router = express.Router();
const rootDir = require('path').resolve('./');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(rootDir+'/index.html');
});
router.get('/login',function(req,res,next){
  res.sendFile(rootDir+'/login.html');
})
router.post('/login',function(req,res,next){
  res.redirect('/');
})
router.get('/generateKeys',function(req,res,next){
  res.json(RSA.generate(256));
})
router.post('/encript',function(req,res,next){
  
  var dataObject = new DataObject(req.body);
  var msgEncriptada = RSA.encrypt(dataObject.mensagem,dataObject.keys.publicKey,dataObject.keys.e);
  res.json({data:msgEncriptada});
})

router.post('/decript',function(req,res,next){
  var dataObject = new DataObject(req.body);
  var msgDecriptada = RSA.decrypt(dataObject.mensagem,dataObject.keys.privateKey,dataObject.keys.publicKey);
  res.json({data:msgDecriptada});
})

module.exports = router;
