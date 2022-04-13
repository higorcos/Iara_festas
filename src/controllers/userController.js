const ModelUsers = require('../../src/models/Users');
const bcrypt = require('bcrypt')//biblioteca para segurança da senha


module.exports = {
    showIndex:(req,res)=>{
        if(req.session.user != undefined){ // quando está logado 
            res.send('Ta on')
        }else{
            res.send('Tá off')
        }
        console.log(req.session.user)
        
        
    },
    registerUser:(req,res)=>{//Mostrar Formulário para registrar usuário (GET)
        res.send('Formulario de Criação')
    },
    saveUser:(req,res)=>{//Recebe dados do formulário de registro de usuário (POST)
         
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password //has
        
        //verifica duplicação de email
        ModelUsers.findOne({
            where:{email:email}
        }).then(user =>{
            
            if(user == undefined){ // se o email não estiver presente no db
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password,salt)
        
            //Criar usuário no db
        ModelUsers.create({
            name:name,
            email:email,
            password:hash
        }).then(()=>{ //sucesso 
            //res.render('login',{dados:req.body}) // VAI GERAR A PÁGINA COM AS DADOS DE LOGIN 
            res.send("pagina de login")

        }).catch((error)=>{//erro na criação 
            res.redirect(501,'/user/createdUser')
        
        })
    }else{// se o email já foi usado
        res.redirect(406,'/user/createdUser')   
    }})},

    login:(req,res)=>{ //Monstra Formulário de Login (GET)
        res.send('Formulario de Login')
    },
    loggingIn:(req,res)=>{//Recebe dados de login (POST)
        const email = req.body.email
        const password = req.body.password
    
        ModelUsers.findOne({
            where:{email:email}
        }).then(user =>{
            if(user != undefined){
                const correct = bcrypt.compareSync(password,user.password)
                if(correct){ //se a senha estiver correta
                    //salvar dados da sessão
                    req.session.user = {
                     id: user.id,
                     email: user.email
                    }
                }
                   res.send(req.session.user)
            }else{
                res.redirect(406,'/login')
            }
        }).catch((error)=>{
            console.log(error)
            res.redirect(501,'login')
        })

    },

}