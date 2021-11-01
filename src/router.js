const express = require('express');
const routes = express.Router();
const UserController = require('../src/controllers/userController')
const ProductsController = require('../src/controllers/productsController')

const adminAuth = require('../src/middleware/adminAuth')

routes.get('/', adminAuth, UserController.showIndex)
routes.get('/login', UserController.login)//form login
routes.post('/login', UserController.loggingIn)//recebe dados do forms de login
//users
routes.get('/user/createdUser', UserController.registerUser)//Render Formulário para registrar usuário 
routes.post('/user/createdUser', UserController.saveUser)//Dados formulário para registro de usuário
//products
routes.get('/products', ProductsController.showProducts)//mostrar produtos
routes.get('/product/created', ProductsController.registerProduct)//Render Formulário para criação de produtos
routes.post('/product/created', ProductsController.saveProduct)//Dados formulário para criação de produtos



module.exports = routes;