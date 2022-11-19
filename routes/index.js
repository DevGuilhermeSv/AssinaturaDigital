var express = require('express');
const md5 = require('js-md5');
const DataObject = require('../models/DataObject');
const Keys = require('../models/Keys');
const { auth } = require('../services/auth');
const RSA = require('../services/RSAService');
var router = express.Router();
const rootDir = require('path').resolve('./');
/* GET home page. */
router.get('/',auth, function (req, res, next) {
    res.sendFile(rootDir + '/index.html');
});
router.get('/login',auth, function (req, res, next) {
  res.sendFile(rootDir + '/login.html');
})
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
router.post('/login', function (req, res, next) {
  
    session = req.session;
    session.userid = req.body.user;
    console.log(req.session)
    res.redirect('/');
  
})
router.get('/encriptMensage',function(req,res){
res.sendFile(rootDir+'/encriptMensage.html')
})
router.get('/assinarMensagem',(req,res)=>{
  res.sendFile(rootDir+'/assinarMensagem.html')
})
router.get('/autenticarMensagem',(req,res)=>{
  res.sendFile(rootDir+'/autenticarMensagem.html')
})
router.get('/decriptMensage',function(req,res){
  res.sendFile(rootDir+'/DecriptMensage.html')
  })
router.get('/generateKeys', function (req, res, next) {
  res.json(RSA.generate(1024));
})
router.post('/encript', function (req, res, next) {

  var dataObject = new DataObject(req.body);
  var msgEncriptada = RSA.encrypt(dataObject.mensagem, dataObject.keys.publicKey, dataObject.keys.e);
  res.json({ publicKey : dataObject.keys.publicKey, data : msgEncriptada });
})

router.post('/decript', function (req, res, next) {
  var dataObject = new DataObject(req.body);
  var msgDecriptada = RSA.decrypt(dataObject.mensagem, dataObject.keys.privateKey, dataObject.keys.publicKey);
  res.json({ data: msgDecriptada });
})
router.post('/sign', function (req, res, next) {

  var dataObject = new DataObject(req.body);
  var hash = md5(dataObject.mensagem);
  var msgEncriptada = RSA.encrypt(dataObject.mensagem, dataObject.keys.privateKey, dataObject.keys.e);
  res.json({ publicKey : dataObject.keys.publicKey, data: msgEncriptada });
})
router.post('/getHash',function(req,res){
  
  var hash = md5(req.body.mensage);
  res.send(hash);
})
router.post('/checkSing', function (req, res, next) {

  var dataObject = new DataObject(req.body);
  var msgEncriptada = RSA.decrypt(dataObject.mensagem, dataObject.keys.publicKey, 65537);
  res.send( msgEncriptada );
})
module.exports = router;
