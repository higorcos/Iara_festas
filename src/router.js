const express = require('express');
const routes = express.Router();
const UserController = require('../src/controllers/userController')

routes.get('/', UserController.showIndex)
routes.post('/user/createdUser', UserController.createdUser)


module.exports = routes;