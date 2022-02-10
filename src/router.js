const express = require('express');
const routes = express.Router();
const UserController = require('../src/controllers/userController')
const ProductsController = require('../src/controllers/productsController')
const ListsControllers = require('../src/controllers/listsControllers')
const ComponentsControllers = require('../src/controllers/componentsControllers')
const InventoryControllers = require('./controllers/inventoryControllers')
const TrafficControllers = require('../src/controllers/trafficController')

const adminAuth = require('../src/middleware/adminAuth')

routes.get('/', adminAuth, UserController.showIndex)
routes.get('/login', UserController.login)//form login
routes.post('/login', UserController.loggingIn)//recebe dados do forms de login
//users
routes.get('/user/createdUser', UserController.registerUser)//Render-Formulário para registrar usuário 
routes.post('/user/createdUser', UserController.saveUser)//Dados formulário para registro de usuário
//products
routes.get('/products', ProductsController.showProducts)//mostrar produtos
routes.get('/product/created', ProductsController.registerProduct)//Render-Formulário para criação de produtos
routes.post('/product/created', ProductsController.saveProduct)//Dados formulário para criação de produtos
routes.get('/product/edit/:id',ProductsController.showEditProduct)//Render-página de edição de produtos
routes.post('/product/edit/update',ProductsController.updateProduct)//update das edições
routes.post('/product/delete/:id',ProductsController.deleteProduct)//apagar produto
//lists
routes.get('/list', ListsControllers.showLists) //home listas
routes.get('/list/created', ListsControllers.registerList) //Render-página de criação da lista
routes.post('/list/created', ListsControllers.saveList) //Dados formulário para criação da lista
routes.get('/list/edit/:id', ListsControllers.showEditList) //Render-página de edição da lista
routes.post('/list/update', ListsControllers.updateList) //Dados formulário para edição da lista
routes.post('/list/delete/:id', ListsControllers.deleteList) //deletar lista

//components
routes.get('/components/list/:listId', ComponentsControllers.showListComponents) //mostrar components de uma lista 
routes.post('/component/add', ComponentsControllers.addComponentToList) //// adicionar componente(produto) a lista
routes.post('/component/remove/:listId/:productId', ComponentsControllers.removeComponentToList) //// remover componente(produto) da lista
routes.get('/components/:listId/:productId', ComponentsControllers.showEditComponent) //página de edição da quantidade de components(produto) 
routes.post('/component/update', ComponentsControllers.updateComponent) //// update componente(produto) a lista
//inventory
routes.get('/inventory', InventoryControllers.showInventory);
routes.get('/inventory/created', InventoryControllers.registerInventory);
routes.post('/inventory/created', InventoryControllers.saveInventory);
routes.get('/inventory/edit/:id', InventoryControllers.showEditInventory);
routes.post('/inventory/edit/update', InventoryControllers.updateInventory);
routes.post('/inventory/delete/:id', InventoryControllers.deleteInventory);

routes.post('/teste',(req,res)=>{
    const id=req.body
    res.send(id)
});



module.exports = routes;            