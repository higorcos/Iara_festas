const ModelComponents = require('../model/Components')
const ModelProducts = require('../model/Products')
const ModelLists = require('../model/Lists');


module.exports = {
    showListComponents:(req,res)=>{//mostrar os componente das listas (individual)
    const listId = req.params.listId;
        
    ModelComponents.findAll({
            where: {listId},
            include:[{model: ModelProducts},{model:ModelLists}]
        }).then((result)=>{
            res.json(result)                    
        }).catch((error)=>{
            console.log(" ");
            console.log("Erro na página dos componentes de uma lista x");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
          })
    },
    addComponentToList:(req,res)=>{ // adicionar componente a lista
        const productId = req.body.productId;
        const listId = req.body.listId;
        const amount = req.body.amount;

        ModelComponents.findOne({where:{productId, listId}}).then((result)=>{
 
            if(result == null){//produto não existe na lista
                ModelComponents.create({listId,productId,amount}).then(()=>{
                    res.send('adicionado com sucesso')
                }).catch((error)=>{
                    console.log(" ");
                    console.log("Erro em adicionar o produto a lista");
                    console.log(" ");
                    console.log(error);
                    res.send(`Erro, fazer redirect`)
                }) 
            }else{ // pesquisa != NULL -> Produto já tá na lista 
                res.send(`Produto já foi adicionado anteriormente`)
            }
        }).catch((error)=>{
            console.log(" ");
            console.log("Erro na pesquisa para saber se o produto já tá na lista");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })

    },
    showEditComponent:(req,res)=>{ //get -> página de edição do componente na lista
        const productId = req.params.productId;
        const listId = req.params.listId;


        ModelComponents.findOne({where:{productId, listId}}).then((result)=>{
            
            if(result != null){ //encontrou no banco de dados
                //res.send(`Página de edição`)
                res.json(result);
            }else{ // não encontrou
                res.redirect(`/components/list/${listId}`)
            }

        }).catch((error)=>{
            console.log(" ");
            console.log("Erro no render da pagina de edição de componente");
            console.log(" ");
            console.log(error);
            res.send(`Erro, fazer redirect`)
        })

    },
    updateComponent:(req,res)=>{//update apenas para mudar a quantidade de um produto 
        const productId = req.body.productId;
        const listId = req.body.listId;
        const amount = req.body.amount;

        ModelComponents.update({amount},{where:{listId,productId}}).then(()=>{
                    res.send('update com sucesso')
                    //redirect para a listagem dos produtos de uma lista em especifico 
                    //res.redirect(`/components/list/${listId}` )
                }).catch((error)=>{
                    console.log(" ");
                    console.log("Erro no update do produto na lista");
                    console.log(" ");
                    console.log(error);
                    res.send(`Erro, fazer redirect`)
                })
    },
    removeComponentToList:(req,res)=>{ // remover componente da lista
        const productId = req.params.productId;
        const listId = req.params.listId;
        
        ModelComponents.findOne({where:{productId:productId}}).then((component)=>{
         
            if(component != undefined){
            ModelComponents.destroy({
                where:{
                    id:component.id,
                    listId:listId,
                    productId:productId
                }
            }).then(()=>{
                res.redirect(`/components/list/${listId}` ) //Produto removido da lista
            }).catch((error)=>{  
                console.log(error);
                res.redirect(`/components/list/${listId}` )
            })
        }else{
            res.redirect(`/components/list/${listId}` )
        }
        }).catch((error)=>{
            console.log(error);
            res.redirect(`/components/list/${listId}` )
        })
    },
  
 
}

/* listagem dos produtos para adição a lista (tipo loja) */
// Count Paginação (listagem)
// adicionar a quantidade de cada componente que esta na lista 
// verificar req.body na hora certa