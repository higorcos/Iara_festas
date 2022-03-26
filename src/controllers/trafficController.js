const ModelTraffic = require('../../src/model/Traffic');
const ModelInventory = require('../../src/model/Inventory');
const ModelProducts = require('../../src/model/Products');
const utilsAvailable = require('../../src/utils/remainingAvailable');

module.exports = {
    
        showTraffic:(req,res)=>{//mostrar 
       
        //restringir a produto 
        //área de pesquisa
        ModelTraffic.findAll({include: {model: ModelInventory,include: ModelProducts}}).then((result)=>{
            res.json(result);
            //render Pagina
            //count
        }).catch((error)=>{
            res.json(error);
            console.log(error);
        })
        
        },
        registerTraffic:(req,res)=>{// pagina form de criação 
            //res.send('Formulário de Criação')
            const idInventory = req.params.idInventory;
            req.session.idTempInventory = idInventory;

            ModelInventory.findOne({where:{id:idInventory},include: [ModelProducts,ModelTraffic]}).then((result)=>{
            
                    //render
                    res.json(result) 
                         
            }).catch((error)=>{
                console.log(" ");
                console.log("Erro, render da página de criação do traffic");
                console.log(" ");
                console.log(error);
                //res.redirect(`/traffic`)
            })
        },  
        saveTraffic:(req,res)=>{// dados(post) form de criação 
            const leased = req.body.leased;//alugado (quantidade)            
            const cost = req.body.cost;//custo do aluguel         
            const date_leased = req.body.date_leased;//data do aluguel   
            const date_delivery = req.body.date_delivery;//data de entrega 
            const inventoryId = req.session.idTempInventory // Id inventory 


            ModelTraffic.create({leased,cost,date_leased,date_delivery,inventoryId}).then(()=>{
                utilsAvailable.updateAvailable(inventoryId);//Atualizando valor disponível em estoque
                res.send('Sucesso');
            }).catch((error)=>{
            console.log(" ");
            console.log("Erro, POST da página de criação do traffic");
            console.log(" ");
            console.log(error);
            res.redirect(`/traffic/created/:${id}`)
            });
        },
        showEditTraffic:(req,res)=>{//página de form de edição 
            const id = req.params.idTraffic 

    ModelInventory.findOne({include: [{model:ModelProducts},{model: ModelTraffic,where:{id}}]}).then((result)=>{
        
            res.json(result)//render
            }).catch((error)=>{ 
            console.log(" ");
            console.log("Erro, render da página de edição do traffic");
            console.log(" ");
            console.log(error);
            //res.redirect(`/traffic/created/${id}`)
            })
            
        },
        updateTraffic:(req,res)=>{//update ()
            const id = req.params.idTraffic
            
            const leased = req.body.leased;//alugado (quantidade)            
            const cost = req.body.cost;//custo do aluguel         
            const date_leased = req.body.date_leased;//data do aluguel   
            const date_delivery = req.body.date_delivery;//data de entrega 
            const inventoryId = req.body.inventoryId // Id inventory 
            
              ModelTraffic.update({leased,cost,date_leased,date_delivery},{where:{id}}).then((result)=>{    
                utilsAvailable.updateAvailable(inventoryId);//Atualizando valor disponível em estoque
                res.redirect(`/traffic/edit/${id}`)
            }).catch((error)=>{
                console.log(" ");
                console.log("Erro, POST da página de edição do traffic");
                console.log(" ");
                console.log(error);
                res.redirect(`/traffic/edit/${id}`);
            }) 


        }, 
        deleteTraffic:(req,res)=>{//deletar 
            const id = req.params.id;

            ModelTraffic.findByPk(id).then((result)=>{
                if(result == undefined){
                    res.redirect(`/traffic`);
                }else {
                    ModelTraffic.destroy({where:{id}}).then((resultDestroy)=>{
                utilsAvailable.updateAvailable(result.inventoryId)//Atualizando valor disponível em estoque
                        res.redirect(`/traffic`)
                    }).catch((error)=>{
                        console.log(" ");
                        console.log("Erro, DELETAR traffic");
                        console.log(" ");
                        console.log(error);
                        res.redirect(`/traffic/edit/${id}`);
                    })
                }
            }).catch((error)=>{
                console.log(" ");
                console.log("Erro, pesquisa para DELETAR traffic");
                console.log(" ");
                console.log(error);
                res.redirect(`/traffic`);
            })
        }
    
        }
    

