const express = require('express');
const routes = express.Router();
const UserController = require('../src/controllers/userController')
const adminAuth = require('../src/middleware/adminAuth')

routes.get('/', adminAuth, UserController.showIndex)
routes.get('/user/createdUser', UserController.registerUser)//Monstra Formulário para registrar usuário 
routes.post('/user/createdUser', UserController.saveUser)//Recebe dados do formulário de registro de usuário

routes.get('/login', UserController.login)//form login
routes.post('/login', UserController.loggingIn)//recebe dados do forms de login


module.exports = routes;