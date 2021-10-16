const express = require('express');
const server = express();
const routes = require('../src/router');
const database = require('../src/database/config')
const bodyParser = require('body-parser')
//Req.body

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

//conexão banco de dados
database.authenticate().then(()=>{
    console.log('         Connection to database successfully')
}).catch((error)=>{
    console.log(error)
    console.log('         Database connection error')
})
//rotas
server.use(routes)


const port = 8084
server.listen(port,()=>console.log(`         Server Online: (port ${port})`))
