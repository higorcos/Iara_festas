const ModelProducts = require('../model/Products')

module.exports = {
    showProducts:(req,res)=>{//mostrar produtos

    
    },
    registerProduct:(req,res)=>{// render form de criação de produto
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
}