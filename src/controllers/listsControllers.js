const ModelLists = require('../model/Lists')

module.exports = {
    showLists:(req,res)=>{//mostrar as listas existentes
    },
    registerList:(req,res)=>{// pagina form de criação da lista

    },
    saveList:(req,res)=>{// dados(post) form de criação da lista
        const name = req.body.name;

        ModelLists.create({
            name:name,
        }).then(()=>{
            res.send(`Lista ${name} criada`)
        }).catch((error)=>{
            console.log(error);
            res.send('erro')
        })
    },
    deleteList:(req,res)=>{//deletar lista
    },  

}