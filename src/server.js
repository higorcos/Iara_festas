const express = require('express');
const server = express();
const routes = require('../src/router');
const database = require('../src/database/config')
const bodyParser = require('body-parser')
const session = require('express-session')

//Req.body
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

//session
server.use(session({
    secret:'e5545b44-0c73-4b72-8d60-e8fa9776a85b',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 86400000
        //1 dia == 86400000
        //10 minutos == 600000
        // 5 segundos == 5000
    }
    //secret uma segurança (o secret vai para o lado do servidor)
    //cookie é um lembrete indireto do secret (o cookie fica no lado do cliente)
    //maxAge tempo limite que o cookie é valido
    //o salvamento de dados padrão do 'express-sessions' é na nemoria ram, não é funcional para grandes aplicações.

}))

//conexão banco de dados
database.authenticate().then(()=>{
    console.log('         Connection to database successfully')
}).catch((error)=>{
    console.log(error)
    console.log('         Database connection error')
})
//rotas
server.use(routes)


const port = 8081
server.listen(port,()=>console.log(`         Server Online: (port ${port})`))
