const ModelProducts = require('../model/Products')

module.exports = {
    showProducts:(req,res)=>{//mostrar produtos
    res.send('Mostrar os produtos')
    
    },
    registerProduct:(req,res)=>{// pagina form de criação de produto
    res.send('Formulario de Criação')
    },
    saveProduct:(req,res)=>{// dados(post) form de criação de produtos
        const name = req.body.name
        const color = req.body.color
        const size = req.body.size
        const value = req.body.value
        const inventory = req.body.inventory
        const category = req.body.category
        const image = req.body.image
        
        ModelProducts.create({
        name:name,
        color:color,
      /*   size:size,
        value:value,
        inventory:inventory,
        category:category, */
        

        }).then(()=>{
           // res.redirect(202,'/products')
           res.send("Sucesso")
        }).catch((error)=>{//erro
            res.redirect(505,'/product/created')
        })
    },
    showEditProduct:(req,res)=>{//página de form de edição de produto
        const idProduct = req.params.id
        if(idProduct != undefined){
        ModelProducts.findByPk(idProduct).then(product=>{
            if(product != undefined){
                res.json(product)//render
            }else{
                res.redirect('/products')
            }
        }).catch((error=>{
            console.log(error)
        }))
    }else{
        res.redirect('/products')
    }
    },
    updateProduct:(req,res)=>{//update de edição (produtos)
        const id = req.body.id
        const name = req.body.name
        const color = req.body.color
        const size = req.body.size
        const value = req.body.value
        const inventory = req.body.inventory
        const category = req.body.category
        const image = req.body.image

        
        ModelProducts.update({name,color,size,value,inventory,category,image},{where: {id}}).then(()=>{

            res.redirect(`/product/edit/${id}`)
        }).catch((error=>{
            console.log(error)
        }))
    },
    deleteProduct:(req,res)=>{//deletar produto
        const id = req.params.id
        if(id != undefined){
            ModelProducts.destroy({
                where:{id}
            }).then(()=>{
                res.redirect('/products')
               
            }).catch((error=>{
            console.log(error)
            
            }))
        }else{
            res.redirect(`/product/edit/${id}`)
        }

    }
}