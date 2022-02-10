const ModelTraffic = require('../../src/model/Traffic');

module.exports = {
    
        showTraffic:(req,res)=>{//mostrar 
        res.send('Mostrar as saídas') 
        //restringir a produto 
        //área de pesquisa
        
        },
        registerTraffic:(req,res)=>{// pagina form de criação 
        res.send('Formulário de Criação')
        },
        saveTraffic:(req,res)=>{// dados(post) form de criação 
            
        },
        showEditTraffic:(req,res)=>{//página de form de edição 
           
        },
        updateTraffic:(req,res)=>{//update ()
            
        },
        deleteTraffic:(req,res)=>{//deletar 
            
        }
    }