const { json, query } = require('express');
var express = require('express');
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
 console.log(req.params);
  res.redirect('/');
})
router.get('/generateKeys',function(req,res,next){
  res.json(RSA.generate(256));
})
router.post('/encript',function(req,res,next){
  console.log(req);
  var {e, chave, mensagem} = req.body;
  var msgEncriptada = RSA.encrypt(mensagem,chave, e);
  res.json({data: msgEncriptada});
})
router.post('/decript',function(req,res,next){
  var {chavePrivada, chavePublica, mensagem} = query.body;
  var msgEncriptada = RSA.decrypt(mensagem,chavePrivada, chavePublica);
  res.json({data: msgEncriptada});
})

module.exports = router;
