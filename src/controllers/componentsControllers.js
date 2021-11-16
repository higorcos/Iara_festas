const ModelComponents = require('../model/Components')
const ModelProducts = require('../model/Products')

module.exports = {
    showListComponents:(req,res)=>{//mostrar os componente das listas (individual)
        const listId = req.params.listId;
        ModelComponents.findAll({include:[{model: ModelProducts}]},{where:{listId}}).then((components)=>{
            res.json(components)
            
        }).catch((error)=>{

            console.log(error);
            res.send('erro')
          })
    },
    updateListComponent:(req,res)=>{//update da edição (componente)
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

    },
  
 
}

/* listagem dos produtos para adição a lista */
  // o produto já pode ser editado de forma isolada (pasta colocar icone de edição na show da lista ) posso criar uma duplicação no banco de dados
