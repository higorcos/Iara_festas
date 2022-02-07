const ModelInventory = require('../model/Inventory');
const ModelProducts = require('../model/Products');

module.exports = {
    
        showInventory:(req,res)=>{//mostrar os produtos que estão catalogados
            // vai listar todos os produtos presentes no inventário
        ModelInventory.findAll({include:[{model: ModelProducts}]}).then((result)=>{
            /* 
             */
            //Count
            if(result.length !== 0){
                res.send(result);
                console.log(result)
            }else{
                console.log(result)
                res.redirect(`/inventory/created`)
            }
        }).catch((error)=>{
            res.redirect(`/products`)
        })
        
        },   
        registerInventory:(req,res)=>{// pagina form de criação 
        res.send('Formulário de Criação')
        //model product
        },
        saveInventory:(req,res)=>{// dados(post) form de criação 
            const productId = req.body.productId;
            const numberInventory = req.body.numberInventory;
            const available = req.body.available;
            const unavailable = req.body.unavailable;
            
            ModelInventory.findOne({where:{productId}}).then((result)=>{// Vai pesquisar se o produto já tá no inventário 
                if(result != undefined){//Produto já está no inventário  
                    res.redirect(`/inventory/edit/${productId}`)                                                                                                              
                }else{
                    //console.log('Não existe');
                                                // Se o produto ainda não estiver no inventário ela será criado
                    ModelInventory.create({
                        productId,
                        numberInventory,
                        available,
                        unavailable
                    }).then(()=>{
                        res.send('Criado com Sucesso')
                    }).catch((erro)=>{
                        res.send('Produto não foi adicionado ao inventário')
                    })}

            }).catch((error)=>{
                console.log(error)
                res.redirect(`/inventory/created`)
            })
        },
        showEditInventory:(req,res)=>{//página de form de edição 
            const productId = req.params.id

            //pesquisa o id do produto no inventario e adiciona o model de produto junto
            ModelInventory.findAll({where:{productId}, include:[{model: ModelProducts}]}).then((result)=>{
                if(result.length !== 0){
                    res.send(result);
                    console.log(result)
                }else{
                    console.log(result)
                    res.redirect(`/inventory`)
                }
            }).catch((error)=>{
                res.redirect(`/inventory`)
            })

           
        },
        updateInventory:(req,res)=>{//update 
            const productId = req.body.productId;
            const numberInventory = req.body.numberInventory;
            const available = req.body.available;
            const unavailable = req.body.unavailable;
        
                    ModelInventory.update({
                        productId,
                        numberInventory,
                        available,
                        unavailable
                    },{
                        where:{productId} //quando o id produto for  encontrado na tabela do inventário
                    }).then(()=>{
                        res.redirect(`/inventory/edit/${productId}`) 
                    }).catch((erro)=>{
                        console.log(error)
                        res.redirect(501,`/inventory/edit/${productId}`) 
                    })
        },
        deleteInventory:(req,res)=>{//deletar 
            const productId = req.params.id;

            ModelInventory.destroy({where:{productId}}).then((result)=>{
                res.redirect(301,`/inventory`)
            }).catch((error)=>{
                res.redirect(406,`/inventory/edit/${productId}`)
            })
        }
    }
