const ModelComponents = require('../model/Components')
const ModelProducts = require('../model/Products')
const ModelLists = require('../model/Lists')

module.exports = {
    showListComponents:(req,res)=>{//mostrar os componente das listas (individual)
        const listId = req.params.listId;

            ModelComponents.findAll({where: {listId},include:[{model: ModelProducts},{model:ModelLists}]}).then((components)=>{
          
                res.json(components)
                                
        }).catch((error)=>{

            console.log(error);
            res.send('erro')
          })
    },
    updateListComponent:(req,res)=>{//update da edição (componente)  // o produto já pode ser editado de forma isolada (pasta colocar icone de edição na show da lista ) posso criar uma duplicação no banco de dados
        
    },

    addComponentToList:(req,res)=>{ // adicionar componente a lista
        const productId = req.params.productId;
        const listId = req.params.listId;

        ModelComponents.create({
            listId:listId,
            productId:productId
        }).then(()=>{
            res.send('adicionado com sucesso')
        }).catch((error)=>{

            console.log(error);
            res.send('erro')
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
                res.redirect(`/components/list/:${listId}` ) //Produto removido da lista
            }).catch((error)=>{  
                console.log(error);
                res.redirect(`/components/list/:${listId}` )
            })
        }else{
            res.redirect(`/components/list/:${listId}` )
        }
        }).catch((error)=>{
            console.log(error);
            res.redirect(`/components/list/:${listId}` )
        })
    },
  
 
}

/* listagem dos produtos para adição a lista */
