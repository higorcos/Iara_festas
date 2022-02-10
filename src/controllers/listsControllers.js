const ModelLists = require('../model/Lists')

module.exports = {
    showLists:(req,res)=>{//mostrar as listas 

        const listId = req.params.listId;
    
            ModelLists.findAll().then((result)=>{
                res.json(result);
                                    
            }).catch((error)=>{
                console.log(" ");
                console.log("Erro na página com principal das listas");
                console.log(" ");
                console.log(error);
                res.send(`Erro, fazer redirect`)
              })
    },
    registerList:(req,res)=>{// pagina form de criação da lista
        res.send(`Página para criação da lista`)
    },
    saveList:(req,res)=>{// dados(post) form de criação da lista

        const name = req.body.name;

        ModelLists.create({
            name:name,
        }).then(()=>{
            res.send(`Lista ${name} criada`)
        }).catch((error)=>{
            console.log(" ");
            console.log("Erro na criação da lista");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })
    },
    showEditList:(req,res)=>{//render-pagina de edição da lista
        const listId = req.params.id;
    
        ModelLists.findOne({where:{id:listId}}).then((result)=>{
            if(result != null){ //encontrou no banco de dados
                //res.send(`Página de edição`)
                res.json(result);
            }else{ // não encontrou
                res.redirect(`/list`)
            }

        }).catch(()=>{

            console.log(" ");
            console.log("Erro no render da página de edição da lista");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })
    },
    updateList:(req,res)=>{// Vai listar os produtos no front para adicionar a lista 
        const listId = req.body.id;
        const name = req.body.name;

        ModelLists.update({name},{where:{id:listId}}).then(()=>{
            res.send(`Atualizado com sucesso`);
        }).catch(()=>{
            console.log(" ");
            console.log("Erro no update da lista");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })
    },
    deleteList:(req,res)=>{//deletar lista
        const listId = req.params.id;
    
        ModelLists.destroy({where:{id:listId}}).then((result)=>{
            
            //res.send(`Página de edição`)
            res.json(result);

        }).catch(()=>{

            console.log(" ");
            console.log("Erro em apagar lista");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })
    },  

}