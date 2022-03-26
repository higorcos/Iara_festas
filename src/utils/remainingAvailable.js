const ModelTraffic = require('../../src/model/Traffic');
const ModelInventory = require('../../src/model/Inventory');
const ModelProducts = require('../../src/model/Products');

module.exports = {

    updateAvailable:(idInventory)=>{
         ModelInventory.findOne({where:{id:idInventory},include: [ModelProducts,ModelTraffic]}).then((result)=>{
           // console.log("Entrou no UpdateAvailable ");
        
            if(result.traffic.length == 0){// se o Produto não apresentar transação
               return result 
           }else{ // se o Produto apresentar transação
                var unavailable = 0;
                for(var j = 0; j<result.traffic.length;j++){
                unavailable = (result.traffic[j].leased) + unavailable;
                } 
                //Calculando a diferença entre a quantidade em transação e quantidade de estoque total e enviando para o front
                //calculo importante para não ocorrer saídas sem a presença do produto em estoque
                const remainingAvailable = (result.inventoryQuantity-unavailable)
                console.log(result.inventoryQuantity +" - "+ unavailable +" = "+ remainingAvailable);
                
               ModelInventory.update({
                   available :remainingAvailable
                },{where:{id:idInventory}}).then((resultt=>{
                   return result 
                })).catch((error)=>{
                   console.log(" ");
                   console.log("Erro, update de produtos disponíveis");
                   console.log(" ");
                   console.log(error);
                })
               }     
            })
        }
}